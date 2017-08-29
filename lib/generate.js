// @flow

const r = require('ramda');
const mapObject = require('map-obj');

const isUndefined = r.equals(undefined);
const isArray = r.is(Array);
const isObject = r.is(Object);
const compact = r.reject(r.either(r.isNil, r.isEmpty));
const isCollection: (obj: mixed) => boolean = r.either(isArray, isObject);

type RuleProperty = string;
type RuleValue = number | string;
type RuleOptions = { prefix?: string, unit?: string, responsive?: boolean };
type Rule = { selector: string, properties: { [string]: mixed }, prefix?: string, responsive?: boolean } ;

const getDeclaration = (arr: [string, RuleValue]): string => `${arr[0]}: ${arr[1]}`;
const getLine = (rule: Rule, suffix?: string): string => {
  const suffixFlag = (suffix !== undefined && suffix !== null) ? `-${suffix}` : ``;
  const declarations = Object.entries(rule.properties).map(getDeclaration).join('; ');
  return `.${rule.selector}${suffixFlag} { ${declarations} }`;
};

const getCSSSafeName = (name: string) => name
  .replace(/\./g, 'd')
  .replace(/%/g, 'p');
const getSelector = (propertyName: string, key: ?string, prefix?: ?string): string => compact([prefix, propertyName, key]).join('-');
const getValue = (val: RuleValue, unit: ?string) => {
  if (isUndefined(unit)) {
    return val;
  } else if (val === 0) {
    return val;
  }

  return `${val}${unit}`;
};
const getPropertyObject = (properties, value: RuleValue) => properties.reduce((result, prop) => r.merge(result, { [prop]: value }), {});

const getPropertyKey = (allValues, key): ?string =>
  isCollection(allValues)
    ? getCSSSafeName(key.toString())
    : undefined;

/**
 * @return Array of rule ASTs
 */
const generateRule = (
  name: string,
  property: RuleProperty | RuleProperty[],
  values: RuleValue | RuleValue[] | { [string]: RuleValue },
  opts: RuleOptions = {},
): Rule | Rule[] => {
  const getRuleAST = (val: RuleValue, key: ?string): Rule => {
    const propertyKey = getPropertyKey(values, key);
    const selector = getSelector(name, propertyKey, opts.prefix);
    const ruleValue = getValue(val, opts.unit);

    const wrappedProperty: RuleProperty[] = Array.isArray(property) ? property : [property];
    const properties = getPropertyObject(wrappedProperty, ruleValue);

    return r.merge(opts, { selector, properties });
  };

  if (Array.isArray(values)) {
    return values.map(v => getRuleAST(v));
  } else if (typeof values === 'object') {
    return mapObject(values, (k, v) => getRuleAST(v, k));
  }

  return getRuleAST(values);
};

const generateStylesheet = async (rules: Rule[], breakpoints: { [string]: string }) => {
  const getSection = (isResponsive, suffix) =>
    rules
      .filter(isResponsive ? r.propEq('responsive', true) : r.T)
      .map(rule => getLine(rule, suffix))
      .join('\n');

  const responsiveSections = mapObject(breakpoints, (k, v) => `
@media only screen and (min-width: ${v}) {
${getSection(true, k)}
}
  `);

  return r.prepend(getSection(), responsiveSections).join('\n\n');
};

module.exports = {
  generateStylesheet,
  generateRule,
};
