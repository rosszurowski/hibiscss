import generateStylesheet from './stylesheet';
import generateRule from './rule';

function lhc (rules, breakpoints = {}) {
  return generateStylesheet(rules, breakpoints);
}

export default lhc;
export const rule = generateRule;
