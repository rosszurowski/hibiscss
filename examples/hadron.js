const csso = require('csso');
const lhc = require('..').default;
const hadron = require('../hadron');

const styles = lhc(hadron({
  colors: {
    pink: '#ffb7b3',
    black: '#141414',
  },
  fontFamily: {
    sans: 'Calibre, sans-serif',
  },
}), hadron.breakpoints);

console.log(csso.minify(styles).css);
