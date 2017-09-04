const r = require('ramda');
const rule = require('./lib').rule;

const breakpoints = {
  s: '479px',
  m: '767px',
  l: '1023px',
};

const defaults = {
  breakpoints,
  colors: {
    black: '#000',
    midGray: '#555',
    moonGray: '#ccc',
    yellow: '#ffff00',
    navy: '#001B44',
  },
  sizes: {
    '1': '1rem',
    '2': '2rem',
    '3': '3rem',
    '4': '4rem',
    '5': '5rem',
    '100%': '100%',
  },
  fontFamily: {
    sans: `-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Ubuntu, Roboto, Noto, 'Segoe UI', Arial, sans-serif`,
    serif: `Georgia, Times, serif`,
  },
  fontSize: {
    '13': '13px',
    '15': '15px',
    '18': '18px',
    '22': '22px',
    '27': '27px',
    '33': '33px',
  },
  opacity: {
    '0%': 0.0,
    '25%': 0.25,
    '50%': 0.5,
    '75%': 0.75,
    '100%': 1.0,
  },
  lineHeight: { '1.2': 1.2, '1.6': 1.6 },
  spacing: [0, 4, 8, 16, 32, 64, 128],
};

const spacing = (values, opts = {}) => {
  const withResponsive = r.merge(opts, { responsive: true });
  const withUnit = r.merge(withResponsive, { unit: 'px' });

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
};

const sizes = (values, opts = {}) => {
  const withResponsive = r.merge(opts, { responsive: true });

  return [
    rule('w', 'width', values, withResponsive),
    rule('h', 'height', values, withResponsive),
  ];
};

const flex = (opts = {}) => {
  const withResponsive = r.merge(opts, { responsive: true });

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
};

const position = () => [
  rule('p', 'position', { absolute: 'absolute', relative: 'relative' }),
  rule('top', 'top', [0]),
  rule('left', 'left', [0]),
  rule('right', 'right', [0]),
  rule('bottom', 'bottom', [0]),
  rule('z', 'z-index', [0, 1, 2, 3, 4]),
  rule('z', 'z-index', { bottom: -1, top: 99 }),
];

const typography = (opts = {}) => [
  rule('c', 'color', opts.colors),
  rule('bc', 'background-color', opts.colors),
  rule('ff', 'font-family', opts.fontFamily),
  rule('ls', 'letter-spacing', { '1': '1px' }),
  rule('lh', 'line-height', opts.lineHeight),
  rule('td', 'text-decoration', { none: 'none', underline: 'underline' }),
  rule('to', 'text-overflow', { initial: 'initial', clip: 'clip', ellipsis: 'ellipsis' }),
  rule('tt', 'text-transform', { none: 'none', uppercase: 'uppercase', lowercase: 'lowercase' }),
  // responsive
  rule('fs', 'font-size', opts.fontSize, { responsive: true }),
  rule('ta', 'text-align', { left: 'left', center: 'center', right: 'right' }, { responsive: true }),
];

const getRules = (opts) => {
  const config = r.merge(defaults, opts);

  return r.flatten([
    rule('d', 'display', { inline: 'inline', inlineBlock: 'inline-block', block: 'block', none: 'none' }, { responsive: true }),
    rule('o', 'opacity', config.opacity),

    position(),
    sizes(config.sizes),
    flex(),
    spacing(config.spacing),
    typography(config),

    rule('pe', 'pointer-events', { none: 'none', auto: 'auto' }),
    rule('us', 'user-select', { none: 'none' }),
  ]);
};

module.exports = getRules;
module.exports.breakpoints = breakpoints;
