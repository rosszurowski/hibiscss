const r = require('ramda');
const csso = require('csso');
const lhc = require('./lib/generate');

const BREAKPOINTS = {
  s: '479px',
  m: '767px',
};

const COLORS = {
  pink: '#ffb7b3',
  black: '#141414',
};

const SIZES = {
  '1': '1rem',
  '2': '2rem',
  '3': '3rem',
  '4': '4rem',
  '5': '5rem',
  '100%': '100%',
};

const SPACING = [0, 4, 8, 16, 32, 64, 128];

const rule = lhc.generateRule;

const spacing = (values, opts = {}) => {
  const withResponsive = Object.assign({}, opts, { responsive: true });
  const withUnit = Object.assign({}, withResponsive, { unit: 'px' });

  return [
    rule('ma', 'margin', values, withUnit),
    rule('mt', 'margin-top', values, withUnit),
    rule('ml', 'margin-left', values, withUnit),
    rule('mr', 'margin-right', values, withUnit),
    rule('mb', 'margin-bottom', values, withUnit),
    rule('mh', ['margin-left', 'margin-right'], values, withUnit),
    rule('mv', ['margin-top', 'margin-bottom'], values, withUnit),

    rule('ml', 'margin-left', { auto: 'auto' }, withResponsive),
    rule('mr', 'margin-right', { auto: 'auto' }, withResponsive),
    rule('mh', ['margin-left', 'margin-right'], { auto: 'auto' }, withResponsive),
    rule('mv', ['margin-top', 'margin-bottom'], { auto: 'auto' }, withResponsive),

    rule('pa', 'padding', values, withUnit),
    rule('pt', 'padding-top', values, withUnit),
    rule('pl', 'padding-left', values, withUnit),
    rule('pr', 'padding-right', values, withUnit),
    rule('pb', 'padding-bottom', values, withUnit),
    rule('ph', ['padding-top', 'padding-bottom'], values, withUnit),
    rule('pv', ['padding-top', 'padding-bottom'], values, withUnit),
  ];
}

const sizes = (values, opts = {}) => {
  const withResponsive = Object.assign({}, opts, { responsive: true });

  return [
    rule('w', 'width', values, withResponsive),
    rule('h', 'height', values, withResponsive),
  ];
}


const flex = (opts = {}) => {
  const withResponsive = Object.assign({}, opts, { responsive: true });

  return [
    rule('x', 'display', 'flex', withResponsive),
    rule('xx', 'flex', '1', withResponsive),
    rule('xa', 'flex', 'auto', withResponsive),
    rule('xn', 'flex', 'none', withResponsive),
    rule('xa', 'align-items', { center: 'center', baseline: 'baseline', stretch: 'stretch', start: 'flex-start', end: 'flex-end' }, withResponsive),
    rule('xd', 'flex-direction', { row: 'row', rowReverse: 'row-reverse', column: 'column', columnReverse: 'column-reverse' }, withResponsive),
    rule('xw', 'flex-wrap', { wrap: 'wrap', noWrap: 'no-wrap' }),
    rule('xj', 'justify-content', { start: 'flex-start', spaceAround: 'space-around', spaceBetween: 'space-between', center: 'center', end: 'flex-end' }, withResponsive),
    rule('xo', 'order', [0, 1, 2, 3, 4], withResponsive),
  ];
}

const getRules = () => r.flatten([
  //
  // Appearance
  //
  rule('o', 'opacity', {
    '0p': 0.0,
    '25p': 0.25,
    '50p': 0.5,
    '75p': 0.75,
    '100p': 1.0
  }),
  //
  // Layout
  //
  rule('d', 'display', { inline: 'inline', inlineBlock: 'inline-block', block: 'block', none: 'none' }, { responsive: true }),
  rule('p', 'position', { absolute: 'absolute', relative: 'relative' }),
  rule('top', 'top', [0]),
  rule('left', 'left', [0]),
  rule('right', 'right', [0]),
  rule('bottom', 'bottom', [0]),
  sizes(SIZES),
  flex(),
  spacing(SPACING),

  //
  // Typography
  //

  rule('c', 'color', COLORS),
  rule('bc', 'background-color', COLORS),
  rule('ff', 'font-family', {
    sans: 'Calibre, -apple-system, BlinkMacSystemFont, Arial, sans-serif',
  }),
  rule('fs', 'font-size', {
    '13': '13px',
    '15': '15px',
    '18': '18px',
    '22': '22px',
    '27': '27px',
    '33': '33px',
  }),
  rule('ls', 'letter-spacing', { '1': '1px' }),
  rule('lh', 'line-height', { '1.2': 1.2, '1.6': 1.6 }),
  rule('ta', 'text-align', { left: 'left', center: 'center', right: 'right' }),
  rule('td', 'text-decoration', { none: 'none', underline: 'underline' }),
  rule('to', 'text-overflow', { initial: 'initial', clip: 'clip', ellipsis: 'ellipsis' }),
  rule('tt', 'text-transform', { none: 'none', uppercase: 'uppercase', lowercase: 'lowercase' }),
  //
  // Position
  //
  rule('z', 'z-index', [0, 1, 2, 3, 4]),
  rule('z', 'z-index', { bottom: -1, top: 99 }),
  //
  // Interaction
  //
  rule('pe', 'pointer-events', { none: 'none', auto: 'auto' }),
  rule('us', 'user-select', { none: 'none' }),
]);

async function main () {
  const rules = getRules();
  const css = await lhc.generateStylesheet(rules, BREAKPOINTS);
  const output = csso.minify(css).css;

  console.log(output);
}

main().catch(console.error.bind(console));
