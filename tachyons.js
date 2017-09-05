const r = require('ramda');
const rule = require('./lib').rule;

const breakpoints = {
  ns: '30em',
  m: '30em',
  l: '60em',
};

const defaults = {
  spacing: [
    0,
    0.25,
    0.5,
    1,
    2,
    4,
    8,
    16,
  ],
  colors: {
    'black': '#000',
    'near-black': '#111',
    'dark-gray': '#333',
    'mid-gray': '#555',
    'gray': '#777',
    'silver': '#999',
    'light-silver': '#aaa',
    'moon-gray': '#ccc',
    'light-gray': '#eee',
    'near-white': '#f4f4f4',
    'white': '#fff',

    'transparent': 'transparent',

    'black-90': 'rgba(0,0,0,.9)',
    'black-80': 'rgba(0,0,0,.8)',
    'black-70': 'rgba(0,0,0,.7)',
    'black-60': 'rgba(0,0,0,.6)',
    'black-50': 'rgba(0,0,0,.5)',
    'black-40': 'rgba(0,0,0,.4)',
    'black-30': 'rgba(0,0,0,.3)',
    'black-20': 'rgba(0,0,0,.2)',
    'black-10': 'rgba(0,0,0,.1)',
    'black-05': 'rgba(0,0,0,.05)',
    'black-025': 'rgba(0,0,0,.025)',
    'black-0125': 'rgba(0,0,0,.0125)',

    'white-90': 'rgba(255,255,255,.9)',
    'white-80': 'rgba(255,255,255,.8)',
    'white-70': 'rgba(255,255,255,.7)',
    'white-60': 'rgba(255,255,255,.6)',
    'white-50': 'rgba(255,255,255,.5)',
    'white-40': 'rgba(255,255,255,.4)',
    'white-30': 'rgba(255,255,255,.3)',
    'white-20': 'rgba(255,255,255,.2)',
    'white-10': 'rgba(255,255,255,.1)',
    'white-05': 'rgba(255,255,255,.05)',
    'white-025': 'rgba(255,255,255,.025)',
    'white-0125': 'rgba(255,255,255,.0125)',

    'dark-red': '#e7040f',
    'red': '#ff4136',
    'light-red': '#ff725c',
    'orange': '#ff6300',
    'gold': '#ffb700',
    'yellow': '#ffd700',
    'light-yellow': '#fbf1a9',
    'purple': '#5e2ca5',
    'light-purple': '#a463f2',
    'dark-pink': '#d5008f',
    'hot-pink': '#ff41b4',
    'pink': '#ff80cc',
    'light-pink': '#ffa3d7',
    'dark-green': '#137752',
    'green': '#19a974',
    'light-green': '#9eebcf',
    'navy': '#001b44',
    'dark-blue': '#00449e',
    'blue': '#357edd',
    'light-blue': '#96ccff',
    'lightest-blue': '#cdecff',
    'washed-blue': '#f6fffe',
    'washed-green': '#e8fdf5',
    'washed-yellow': '#fffceb',
    'washed-red': '#ffdfdf',
  },
};

const aspectRatio = () => [
  // TODO
];

const flex = () => {
  const flexAlignValues = { start: 'flex-start', end: 'flex-end', center: 'center', baseline: 'baseline', stretch: 'stretch' };
  const withOptions = { responsive: true };

  return [
    rule('flex', 'display', 'flex', withOptions),
    rule('inline-flex', 'display', 'inline-flex', withOptions),
    rule('flex', 'flex', { auto: '1 1 auto', none: 'none' }, withOptions),
    rule('flex', 'flex-direction', { column: 'column', row: 'row', 'column-reverse': 'column-reverse', 'row-reverse': 'row-reverse' }, withOptions),
    rule('flex', 'flex-wrap', { wrap: 'wrap', nowrap: 'nowrap', 'wrap-reverse': 'wrap-reverse' }, withOptions),
    rule('items', 'align-items', flexAlignValues, withOptions),
    rule('self', 'align-self', flexAlignValues, withOptions),
    rule('justify', 'justify-content', flexAlignValues, withOptions),
    rule('content', 'align-content', flexAlignValues, withOptions),
    rule('order', 'order', [0, 1, 2, 3, 4, 5, 6, 7, 8], withOptions),
    rule('order', 'order', { last: 99999 }, withOptions),
  ];
};

const spacing = (values, opts) => [
  rule('ma', 'margin', values, opts),
  rule('mt', 'margin-top', values, opts),
  rule('ml', 'margin-left', values, opts),
  rule('mr', 'margin-right', values, opts),
  rule('mb', 'margin-bottom', values, opts),
  rule('mh', ['margin-left', 'margin-right'], values, opts),
  rule('mv', ['margin-top', 'margin-bottom'], values, opts),

  rule('ml', 'margin-left', { auto: 'auto' }, opts),
  rule('mr', 'margin-right', { auto: 'auto' }, opts),
  rule('mh', ['margin-left', 'margin-right'], { auto: 'auto' }, opts),
  rule('mv', ['margin-top', 'margin-bottom'], { auto: 'auto' }, opts),

  rule('pa', 'padding', values, opts),
  rule('pt', 'padding-top', values, opts),
  rule('pl', 'padding-left', values, opts),
  rule('pr', 'padding-right', values, opts),
  rule('pb', 'padding-bottom', values, opts),
  rule('ph', ['padding-top', 'padding-bottom'], values, opts),
  rule('pv', ['padding-top', 'padding-bottom'], values, opts),
];

const overflow = (values, opts) => [
  rule('overflow', 'overflow', values, opts),
  rule('overflow-x', 'overflow-x', values, opts),
  rule('overflow-y', 'overflow-y', values, opts),
];

const getRules = (opts) => {
  const config = r.merge(defaults, opts);
  const opt = obj => r.merge({ responsive: true }, obj);

  // to be added...
  return r.flatten([
    aspectRatio(config),
    rule(null, 'background-size', { cover: 'cover', contain: 'contain' }, opt()),
    rule('outline', 'outline', '1px solid', opt()),
    rule('outline', 'outline', { transparent: '1px solid transparent', '0': 0 }, opt()),
    // TODO: border
    rule('b', 'border-style', { dotted: 'dotted', dashed: 'dashed', solid: 'solid', none: 'none' }, opt()),
    rule('bw', 'border-width', [0, 0.125, 0.25, 0.5, 1, 2], opt({ unit: 'rem' })),
    // TODO: border color
    rule('br', 'border-radius', [0, 0.125, 0.25, 0.5, 1], opt({ unit: 'rem' })),
    rule('br', 'border-radius', { '100': '100%', pill: '9999px' }, opt()),

    flex(),

    rule('f', 'float', { l: 'left', r: 'right', n: 'none' }, opt()),
    // NOTE: should skip first array item
    rule('f', 'font-size', [0, 3, 2.25, 1.5, 1.25, 1, 0.875, 0.75], opt({ unit: 'rem' })),
    rule(null, 'font-family', {
      'sans-serif': `-apple-system, BlinkMacSystemFont, 'avenir next', avenir, 'helvetica neue', helvetica, ubuntu, roboto, noto, 'segoe ui', arial, sans-serif`,
      serif: `georgia, times, serif`,
      'system-sans-serif': `sans-serif`,
      'system-serif': `serif`,
      courier: `'Courier Next', courier, monospace`,
      helvetica: `'helvetica neue', helvetica, sans-serif`,
      avenir: `'avenir next', avenir, sans-serif`,
      athelas: `athelas, georgia, serif`,
      georgia: `georgia, serif`,
      times: `times, serif`,
      bodoni: `'Bodoni MT', serif`,
      calisto: `'Calisto MT', serif`,
      garamond: `garamond, serif`,
      baskerville: `baskerville, serif`,
    }),
    rule('fs', 'font-style', { i: 'italic', normal: 'normal' }),
    // NOTE: should skip first array item
    rule('fw', 'font-weight', [0, 100, 200, 300, 400, 500, 600, 700, 800, 900]),
    rule('fw', 'font-weight', { normal: 'normal', b: 'bold' }),
    rule('t', 'text-align', { l: 'left', r: 'right', c: 'center', j: 'justify' }),
    // HACK: I'm using 'null' as the key here because it'll be filtered out. We
    // should maybe have a key to specify a default value
    rule('tracked', 'letter-spacing', { null: 0.1, tight: -0.05, mega: 0.25 }, { unit: 'em' }),
    rule('lh', 'line-height', { solid: 1, title: 1.25, copy: 1.5 }),
    rule('tt', 'text-transform', { c: 'capitalize', l: 'lowercase', u: 'uppercase', n: 'none' }),

    // NOTE: should skip first array item
    rule('h', 'height', [0, 1, 2, 4, 8, 16], opt({ unit: 'rem' })),
    rule('h', 'height', { '25': '25%', '50': '50%', '75': '75%', '100': '100%', auto: 'auto', inherit: 'inherit' }, opt()),
    rule('vh', 'height', { '25': 25, '50': 50, '75': 75, '100': 100 }, opt({ unit: 'vh' })),

    // TODO: link

    rule('mw', 'max-width', { none: 'none', 100: '100%' }, opt()),
    // NOTE: should skip first array item
    rule('mw', 'max-width', [0, 1, 2, 4, 8, 16, 32, 48, 64, 96], opt({ unit: 'rem' })),

    // TODO: width
    overflow({ visible: 'visible', hidden: 'hidden', scroll: 'scroll', auto: 'auto' }, opt()),
    rule(null, 'position', { static: 'static', relative: 'relative', absolute: 'absolute', fixed: 'fixed' }, opt()),
    rule('o', 'opacity', { '0': 0, '025': 0.025, '05': 0.05, 10: 0.1, 20: 0.2, 30: 0.3, 40: 0.4, 50: 0.5, 60: 0.6, 70: 0.7, 80: 0.8, 90: 0.9, 100: 1.0 }, opt()),
    rule('rotate', 'transform', { 45: 'rotate(45deg)', 90: 'rotate(90deg)', 135: 'rotate(135deg)', 180: 'rotate(180deg)', 225: 'rotate(225deg)', 270: 'rotate(270deg)', 315: 'rotate(315deg)' }, opt()),

    rule(null, 'color', config.colors),
    rule('bg', 'background-color', config.colors),
    rule('b', 'border-color', config.colors),

    spacing(config.spacing, opt({ unit: 'rem' })),
    // TODO: negative margins
  ]);
};

module.exports = getRules;
module.exports.breakpoints = breakpoints;
