const generateStylesheet = require('./stylesheet');
const generateRule = require('./rule');

function lhc (rules, breakpoints = {}) {
  return generateStylesheet(rules, breakpoints);
}

module.exports = lhc;
module.exports.rule = generateRule;
