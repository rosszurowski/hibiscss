const csso = require('csso');
const lhc = require('..').default;
const hadron = require('../lib/hadron').default;
const breakpoints = require('../lib/hadron').breakpoints;

const styles = lhc(hadron({
  colors: {
    pink: '#ffb7b3',
    black: '#141414',
  },
  fontFamily: {
    sans: 'Calibre, sans-serif',
  },
}), breakpoints);

console.log(csso.minify(styles).css);
