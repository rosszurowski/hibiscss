const r = require('ramda');
const rule = require('./lib').rule;

const toCamelCase = str => str.replace(/[-_]([a-z])/g, m => m[1].toUpperCase());

const breakpoints = {
  s: '479px',
  m: '767px',
  l: '1023px',
};

const defaults = {
  colors: {},
  borderRadius: {},
  fontFamily: {
    sans: `-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Ubuntu, Roboto, Noto, 'Segoe UI', Arial, sans-serif`,
    serif: `Georgia, Times, serif`,
  },
  fontSize: {
    12: '12px',
    14: '14px',
    16: '16px',
    20: '20px',
    36: '36px',
    48: '48px',
    80: '80px',
    96: '96px',
  },
  fontWeight: {
    normal: 'normal',
    bold: 'bold',
  },
  letterSpacing: {},
  lineHeight: {
    '1.0': 1.0,
    '1.25': 1.25,
    '1.5': 1.5,
  },
  opacity: {
    '0%': 0.0,
    '25%': 0.25,
    '50%': 0.5,
    '75%': 0.75,
    '100%': 1.0,
  },
  maxWidths: [],
  sizes: {},
  spacing: [0, 4, 8, 16, 32, 64, 128],
  verboseClassNames: false,
};

const verboseKeys = new Map();

const marginHorizontalProperties = ['margin-left', 'margin-right'];
const marginVerticalProperties = ['margin-top', 'margin-bottom'];
const paddingHorizontalProperties = ['padding-left', 'padding-right'];
const paddingVerticalProperties = ['padding-top', 'padding-bottom'];

verboseKeys.set(marginHorizontalProperties, 'marginHorizontal');
verboseKeys.set(marginVerticalProperties, 'marginVertical');
verboseKeys.set(paddingHorizontalProperties, 'paddingHorizontal');
verboseKeys.set(paddingVerticalProperties, 'paddingVertical');

verboseKeys.set('align-items', 'flexAlign');
verboseKeys.set('justify-content', 'flexJustify');
verboseKeys.set('order', 'flexOrder');

const getConciseKey = key => key;
const getVerboseKey = (_, properties) =>
  verboseKeys.has(properties)
    ? verboseKeys.get(properties)
    : toCamelCase(properties);

function getRules (opts) {
  const config = r.merge(defaults, opts);
  const { verboseClasses } = config;

  const getKey = verboseClasses ? getVerboseKey : getConciseKey;
  const getRule = (key, properties, values, options) =>
    rule(getKey(key, properties), properties, values, options);

  return r.flatten([
    getRule('d', 'display', { inline: 'inline', inlineBlock: 'inline-block', block: 'block', none: 'none' }, { responsive: true }),
    getRule('o', 'opacity', config.opacity),
    getRule('of', 'overflow', { hidden: 'hidden', scroll: 'scroll', visible: 'visible' }),

    getRule('bgc', 'background-color', config.colors),
    getRule('bgs', 'background-size', { cover: 'cover', contain: 'contain' }),
    getRule('bgp', 'background-position', { center: 'center', top: 'top', right: 'right', left: 'left', bottom: 'bottom' }),
    getRule('bgr', 'background-repeat', { noRepeat: 'no-repeat', x: 'repeat-x', y: 'repeat-y' }),

    getRule('br', 'border-radius', config.borderRadius),

    position(),
    flex(),
    sizes(config.sizes),
    getRule('mw', 'max-width', config.maxWidths),
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
      getRule('mh', marginHorizontalProperties, values, withUnit),
      getRule('mv', marginVerticalProperties, values, withUnit),

      getRule('ml', 'margin-left', { auto: 'auto' }, withResponsive),
      getRule('mr', 'margin-right', { auto: 'auto' }, withResponsive),
      getRule('mh', marginHorizontalProperties, { auto: 'auto' }, withResponsive),
      getRule('mv', marginVerticalProperties, { auto: 'auto' }, withResponsive),

      getRule('pa', 'padding', values, withUnit),
      getRule('pt', 'padding-top', values, withUnit),
      getRule('pl', 'padding-left', values, withUnit),
      getRule('pr', 'padding-right', values, withUnit),
      getRule('pb', 'padding-bottom', values, withUnit),
      getRule('ph', paddingHorizontalProperties, values, withUnit),
      getRule('pv', paddingVerticalProperties, values, withUnit),
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
      getRule('fs', 'font-style', { normal: 'normal', italic: 'italic' }),
      getRule('fw', 'font-weight', config.fontWeight),
      getRule('ta', 'text-align', { left: 'left', center: 'center', right: 'right' }, { responsive: true }),
    ];
  }
}

module.exports = getRules;
module.exports.breakpoints = breakpoints;
