const hibiscss = require('..').default;
const kit = require('../default');
const csso = require('csso');

const styles = hibiscss(kit({
  colors: {
    pink: '#ffb7b3',
    black: '#141414',
  },
  fontFamily: {
    sans: 'Work Sans, sans-serif',
  },
}), kit.breakpoints);

console.log(csso.minify(styles).css);
