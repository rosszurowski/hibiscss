import r from 'ramda';
import generateStylesheet from './stylesheet';
import generateRule from './rule';

function hibiscss (rules, breakpoints = {}) {
  return generateStylesheet(r.flatten(rules), breakpoints);
}

export default hibiscss;
export const rule = generateRule;
