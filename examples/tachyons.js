const csso = require('csso');
const hibiscss = require('..').default;
const tachyons = require('../tachyons');

const styles = hibiscss(tachyons({}), tachyons.breakpoints);

console.log(styles);
// console.log(csso.minify(styles).css);
