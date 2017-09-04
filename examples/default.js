const lhc = require('..');
const defaultRules = require('../lib/defaults');
const csso = require('csso');

const styles = lhc(defaultRules({
  colors: {
    pink: '#ffb7b3',
    black: '#141414',
  },
}), defaultRules.breakpoints);

console.log(csso.minify(styles).css);
