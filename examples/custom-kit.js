import lhcss, { rule } from 'lhcss';
import csso from 'csso';

const colors = { blue: '#00f', red: '#f00' };
const spacing = [0, 2, 4, 8, 16, 24];

function kit () {
  return [
    rule('bc', 'background-color', colors),
    rule('c', 'color', colors),

    rule('ma', 'margin', spacing, { responsive: true, unit: 'px' }),
    rule('p', 'position', { relative: 'relative', absolute: 'absolute' }, { responsive: true }),
  ];
}

const styles = lhcss(kit());

console.log(csso.minify(styles).css);
