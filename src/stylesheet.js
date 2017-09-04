// @flow

import r from 'ramda';
import type { Rule, RuleProperty } from './types';

const getDeclaration = (arr: [RuleProperty, string]): string => arr.join(':');
const getLine = (rule: Rule, suffix?: string): string => {
  const suffixFlag = (suffix !== undefined && suffix !== null) ? `-${suffix}` : ``;
  const declarations = r.toPairs(rule.properties).map(getDeclaration).join(';');
  return `.${rule.selector}${suffixFlag}{${declarations}}`;
};

const generateStylesheet = (rules: Rule[], breakpoints: { [string]: string } = {}) => {
  const getSection = (isResponsive, suffix) => (
    rules
      .filter(isResponsive ? r.propEq('responsive', true) : r.T)
      .map(rule => getLine(rule, suffix))
      .join('\n')
  );

  const responsiveSections = r.toPairs(breakpoints).map(([k, v]) => `@media only screen and (min-width: ${v}) {${getSection(true, k)}}`);

  return r.prepend(getSection(), responsiveSections).join('\n');
};

export default generateStylesheet;
