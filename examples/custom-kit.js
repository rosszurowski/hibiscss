const hibiscss = require('..').default;
const rule = require('..').rule;
const csso = require('csso');

const colors = { blue: '#00f', red: '#f00' };

function myCustomKit () {
  return [
    rule('bgc', 'background-color', colors),
    rule('c', 'color', colors),
  ];
}

const styles = hibiscss(myCustomKit());

console.log(csso.minify(styles).css);
