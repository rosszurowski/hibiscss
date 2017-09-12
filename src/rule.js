// @flow

import r from 'ramda';
import type { Rule, RuleProperty, RuleValue, RuleOptions } from './types';

const isArray = r.is(Array);
const isObject = r.is(Object);
const isCollection = r.either(isArray, isObject);
const compact = r.reject(r.either(r.isNil, r.isEmpty));

const getCSSSafeName = (name: string) => name.replace(/\./g, 'd').replace(/%/g, 'p');
const getSelector = (propertyName: string, key: ?string, prefix?: ?string): string => compact([prefix, propertyName, key]).join('-');

const getPropertyObject = (properties: RuleProperty[], value: RuleValue): { [RuleProperty]: RuleValue } =>
  properties.reduce(
    (result, prop) => r.merge(result, { [prop]: value }),
    {},
  );

const getPropertyKey = (allValues, key): ?string =>
  (isCollection(allValues) && key !== null && key !== undefined)
    ? getCSSSafeName(key.toString())
    : undefined;
const getPropertyValue = (val: RuleValue, unit: ?string): string =>
  (unit === undefined || unit === null || val === 0)
    ? val.toString()
    : `${val}${unit}`;

/**
 * Generate a rule or array of rules based on the declaration given.
 */
const generateRule = (
  ruleName: string,
  ruleProperty: RuleProperty | RuleProperty[],
  ruleValues: RuleValue | RuleValue[] | { [string]: RuleValue },
  opts: RuleOptions = {},
): Rule | Rule[] => {
  const { unit, startIndexAtOne, ...unusedOpts } = opts;

  const getRuleAST = (val: RuleValue, key: ?string): Rule => {
    const ruleValue = getPropertyValue(val, opts.unit);
    const wrappedProperty: RuleProperty[] = Array.isArray(ruleProperty) ? ruleProperty : [ruleProperty];
    const properties = getPropertyObject(wrappedProperty, ruleValue);

    const selector = getSelector(ruleName, getPropertyKey(ruleValues, key), opts.prefix);

    return r.merge(unusedOpts, { selector, properties });
  };

  if (Array.isArray(ruleValues)) {
    const getArrayRuleKey = startIndexAtOne === true
      ? i => (i + 1).toString()
      : i => i.toString();
    return ruleValues.map((v, i) => getRuleAST(v, getArrayRuleKey(i)));
  } else if (typeof ruleValues === 'object') {
    return r.toPairs(ruleValues).map(([k, v]) => getRuleAST(v, k));
  }

  return getRuleAST(ruleValues);
};

export default generateRule;
