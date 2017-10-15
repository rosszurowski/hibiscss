## Tachyons Kit

The bundled tachyons kit generates a set of rules very similar to the [tachyons](http://tachyons.io/docs/) framework.

This kit and documentation are still in progress. If you find a bug or an incompatability, [submit an issue!](https://github.com/rosszurowski/hibiscss/issues/new)

## Caveats

The main difference to be aware of is that values are separated by a `-`, like so:

```css
/* tachyons */
.f1 { ... }
.fw4 { ... }
.ttc { ... }
.georgia { ... }

/* hibiscss */
.f-1 { ... }
.fw-4 { ... }
.tt-c { ... }
.georgia { ... }
```

## Usage

Here’s an example configuration with default options for all the values. Default values are [taken from tachyons](http://tachyons.io/docs/themes/skins/).

```jsx
const config = {
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
```
