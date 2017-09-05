import lhcss, { rule } from 'lhcss';
import csso from 'csso';

const colors = { blue: '#00f', red: '#f00' };

function myCustomKit () {
  return [
    rule('bc', 'background-color', colors),
    rule('c', 'color', colors),
  ];
}

const styles = lhcss(myCustomKit());

console.log(csso.minify(styles).css);
