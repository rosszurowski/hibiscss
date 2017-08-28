const r = require('ramda');
const map = require('lodash/map');
const csso = require('csso');

const isUndefined = r.equals(undefined);
const isArray = r.is(Array);
const isString = r.is(String);
const isObject = r.is(Object);
const isNumber = r.is(Number);
const compact = r.reject(r.either(r.isNil, r.isEmpty));
const isCollection = r.either(isArray, isObject);

const getDeclaration = ([prop, val]) => `${prop}: ${val}`;
const getLine = (selector, properties, value, suffix) => {
  const suffixFlag = suffix !== undefined ? `-${suffix}` : ``;
  const declarations = Object.entries(properties).map(getDeclaration).join('; ');
  return `.${selector}${suffixFlag} { ${declarations} }`;
}

const getCSSSafeName = str => str.toString()
  .replace(/\./g, 'd')
  .replace(/\%/g, 'p');
const getPropertyName = prop => getCSSSafeName(prop);
const getSelector = (propertyName, key, prefix) => compact([prefix, propertyName, key]).join('-');
const getValue = (val, unit) => isUndefined(unit) ? val : val === 0 ? val : `${val}${unit}`;
const getPropertyObject = (properties, value) => properties.reduce((result, prop) => r.merge(result, { [prop]: value }), {});

const getPropertyKey = (allValues, val, key, opts) =>
  isCollection(allValues)
    ? getCSSSafeName(key.toString())
    : undefined;

/**
 * @return Array of rule ASTs
 */
const generateRule = (name, property, value, opts = {}) => {
  const getRuleAST = (val, key) => {
    const propertyKey = getPropertyKey(value, val, key, opts);
    const selector = getSelector(name, propertyKey, opts.prefix);
    const ruleValue = getValue(val, opts.unit);

    const wrappedProperty = isArray(property) ? property : [property];
    const properties = getPropertyObject(wrappedProperty, ruleValue);

    return r.merge(opts, { selector, properties });
  };

  return isCollection(value) ? map(value, getRuleAST) : getRuleAST(value, undefined);
};

const generateStylesheet = async (rules, breakpoints) => {
  const getSection = (isResponsive, suffix) =>
    rules
      .filter(isResponsive ? r.propEq('responsive', true) : r.T)
      .map(rule => getLine(rule.selector, rule.properties, rule.value, suffix))
      .join('\n');

  const responsiveSections =  map(breakpoints, (v, k) => `
@media only screen and (min-width: ${v}) {
${getSection(true, k)}
}
  `);

  return r.prepend(getSection(), responsiveSections).join('\n\n');
}

module.exports = {
  generateStylesheet,
  generateRule,
}
