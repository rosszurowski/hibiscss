const csso = require('csso');
const lhc = require('..').default;
const tachyons = require('../tachyons');

const styles = lhc(tachyons({}), tachyons.breakpoints);

console.log(csso.minify(styles).css);
