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
  fontWeight: {
    'normal': 'normal',
    'bold': 'bold',
  },
  letterSpacing: { '1': '1px' },
  lineHeight: { '1.2': 1.2, '1.6': 1.6 },
  opacity: {
    '0%': 0.0,
    '25%': 0.25,
    '50%': 0.5,
    '75%': 0.75,
    '100%': 1.0,
  },
  spacing: [0, 4, 8, 16, 32, 64, 128],
};

const verboseKeyNames = {
  d: 'display',
  ma: 'margin',
  mt: 'marginTop',
  ml: 'marginLeft',
  mr: 'marginRight',
  mb: 'marginBottom',
  mh: 'marginHorizontal',
  mv: 'marginVertical',
  pa: 'padding',
  pt: 'paddingTop',
  pl: 'paddingLeft',
  pr: 'paddingRight',
  pb: 'paddingBottom',
  ph: 'paddingHorizontal',
  pv: 'paddingVertical',
  x: 'flex',
  xa: 'flexAlign',
  xd: 'flexDirection',
  xj: 'flexJustify',
  xo: 'flexOrder',
  xw: 'flexWrap',
  o: 'opacity',
  of: 'overflow',
  bgc: 'backgroundColor',
  bgp: 'backgroundPosition',
  bgs: 'backgroundSize',
  bgr: 'backgroundRepeat',
  p: 'position',
  z: 'zIndex',
  w: 'width',
  h: 'height',
  c: 'color',
  ff: 'fontFamily',
  fs: 'fontSize',
  fw: 'fontWeight',
  lh: 'lineHeight',
  ls: 'letterSpacing',
  ta: 'textAlign',
  td: 'textDecoration',
  tt: 'textTransform',
  to: 'textOverflow',
  pe: 'pointerEvents',
  us: 'userSelect',
};

const getRules = (opts) => {
  const config = r.merge(defaults, opts);
  const { verboseClasses } = config;

  const getKey = verboseClasses
    ? key => verboseKeyNames[key] ? verboseKeyNames[key] : key
    : key => key;
  const getRule = (key, properties, values, options) => rule(getKey(key), properties, values, options);

  return r.flatten([
    getRule('d', 'display', { inline: 'inline', inlineBlock: 'inline-block', block: 'block', none: 'none' }, { responsive: true }),
    getRule('o', 'opacity', config.opacity),
    getRule('of', 'overflow', { hidden: 'hidden', scroll: 'scroll', visible: 'visible' }),

    getRule('bgc', 'background-color', config.colors),
    getRule('bgs', 'background-size', { cover: 'cover', contain: 'contain' }),
    getRule('bgp', 'background-position', { center: 'center', top: 'top', right: 'right', left: 'left', bottom: 'bottom' }),
    getRule('bgr', 'background-repeat', { noRepeat: 'no-repeat', x: 'repeat-x', y: 'repeat-y' }),

    position(),
    flex(),
    sizes(config.sizes),
    spacing(config.spacing),
    typography(),

    getRule('c', 'cursor', { pointer: 'pointer', default: 'default' }),
    getRule('pe', 'pointer-events', { none: 'none', auto: 'auto' }),
    getRule('us', 'user-select', { none: 'none', auto: 'auto' }),
  ]);

  function spacing (values) {
    const withResponsive = { responsive: true };
    const withUnit = r.merge(withResponsive, { unit: 'px' });

    return [
      getRule('ma', 'margin', values, withUnit),
      getRule('mt', 'margin-top', values, withUnit),
      getRule('ml', 'margin-left', values, withUnit),
      getRule('mr', 'margin-right', values, withUnit),
      getRule('mb', 'margin-bottom', values, withUnit),
      getRule('mh', ['margin-left', 'margin-right'], values, withUnit),
      getRule('mv', ['margin-top', 'margin-bottom'], values, withUnit),

      getRule('ml', 'margin-left', { auto: 'auto' }, withResponsive),
      getRule('mr', 'margin-right', { auto: 'auto' }, withResponsive),
      getRule('mh', ['margin-left', 'margin-right'], { auto: 'auto' }, withResponsive),
      getRule('mv', ['margin-top', 'margin-bottom'], { auto: 'auto' }, withResponsive),

      getRule('pa', 'padding', values, withUnit),
      getRule('pt', 'padding-top', values, withUnit),
      getRule('pl', 'padding-left', values, withUnit),
      getRule('pr', 'padding-right', values, withUnit),
      getRule('pb', 'padding-bottom', values, withUnit),
      getRule('ph', ['padding-top', 'padding-bottom'], values, withUnit),
      getRule('pv', ['padding-left', 'padding-right'], values, withUnit),
    ];
  }

  function sizes (values) {
    const withResponsive = { responsive: true };

    return [
      getRule('w', 'width', values, withResponsive),
      getRule('h', 'height', values, withResponsive),
    ];
  }

  function flex () {
    const withResponsive = { responsive: true };

    return [
      getRule('x', 'display', 'flex', withResponsive),
      getRule('x', 'flex', { '1': '1', auto: 'auto', none: 'none' }, withResponsive),
      getRule('xa', 'align-items', { center: 'center', baseline: 'baseline', stretch: 'stretch', start: 'flex-start', end: 'flex-end' }, withResponsive),
      getRule('xd', 'flex-direction', { row: 'row', rowReverse: 'row-reverse', column: 'column', columnReverse: 'column-reverse' }, withResponsive),
      getRule('xw', 'flex-wrap', { wrap: 'wrap', noWrap: 'no-wrap' }),
      getRule('xj', 'justify-content', { start: 'flex-start', spaceAround: 'space-around', spaceBetween: 'space-between', center: 'center', end: 'flex-end' }, withResponsive),
      getRule('xo', 'order', [0, 1, 2, 3, 4], withResponsive),
    ];
  }

  function position () {
    return [
      getRule('p', 'position', { absolute: 'absolute', relative: 'relative' }),
      getRule('top', 'top', [0]),
      getRule('left', 'left', [0]),
      getRule('right', 'right', [0]),
      getRule('bottom', 'bottom', [0]),
      getRule('z', 'z-index', [0, 1, 2, 3, 4]),
      getRule('z', 'z-index', { bottom: -1, top: 99 }),
    ];
  }

  function typography () {
    return [
      getRule('c', 'color', config.colors),
      getRule('ff', 'font-family', config.fontFamily),
      getRule('ls', 'letter-spacing', config.letterSpacing),
      getRule('lh', 'line-height', config.lineHeight),
      getRule('td', 'text-decoration', { none: 'none', underline: 'underline' }),
      getRule('to', 'text-overflow', { initial: 'initial', clip: 'clip', ellipsis: 'ellipsis' }),
      getRule('tt', 'text-transform', { none: 'none', uppercase: 'uppercase', lowercase: 'lowercase' }),
      // responsive
      getRule('fs', 'font-size', config.fontSize, { responsive: true }),
      getRule('fw', 'font-weight', config.fontWeight),
      getRule('ta', 'text-align', { left: 'left', center: 'center', right: 'right' }, { responsive: true }),
    ];
  }
};

module.exports = getRules;
module.exports.breakpoints = breakpoints;
