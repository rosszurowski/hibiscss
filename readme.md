<h1 align="center">
	<img width="600" src="https://cdn.rawgit.com/rosszurowski/hibiscss/337654f1/media/logo.svg" alt="Hibiscss" />
	<br />
</h1>

> Functional css generator

[![Build Status](https://travis-ci.org/rosszurowski/hibiscss.svg?branch=master)](https://travis-ci.org/rosszurowski/hibiscss)
[![npm](https://badgen.now.sh/npm/v/hibiscss)](https://www.npmjs.com/package/hibiscss)

Functional css (à la [tachyons](http://tachyons.io)), but customizable for your project's visual language. No more rewriting long stylesheets to include your colours, typefaces, and spacing scale! 🌺


#### Features

* **flexible**: easily define colors, type styles, spacing scales
* **performant**: only generates the breakpoints/variables you need (default kit is 3kb, compared to 14kb+ for tachyons)
* **simple**: spits out a css string, no fancy client-side work needed
* **just javascript**: integrates well with css-in-js, easy to extend, automate documentation, etc.

:construction: This project is still `v0.x.x` and the API is subject to change.

## Install

```bash
npm install hibiscss --save
```

## Getting Started

For a quick start, use the [default rule kit](https://github.com/rosszurowski/hibiscss/blob/master/docs/default.md). You can pass in options to define your project’s visual language:

```js
import hibiscss from 'hibiscss';
import kit from 'hibiscss/default';

const styles = hibiscss(kit({
  colors: {
    pink: '#ffb7b3',
    black: '#141414'
  },
  fontFamily: {
    work: 'Work Sans, sans-serif'
  },
  fontSize: [36, 24, 19, 17, 15, 12]
}));
```

Then use the classes like so:

```html
<div class="c-pink ff-work fs-2">Work Sans in pink at 24px!</div>
```

Yay! :tada: Check out [the examples](https://github.com/rosszurowski/hibiscss/tree/master/examples) or [default kit docs](https://github.com/rosszurowski/hibiscss/blob/master/docs/default.md) for more!

## Configuration

Hibiscss returns a string of css. You can integrate it with your build system however you'd like. I find the easiest is to spit out a static css file, like so:

Make a file with your config and output it to `console.log`, like so:

```js
// css.js

import hibiscss from 'hibscss';
import tachyons from 'hibscss/tachyons';

const styles = hibiscss(tachyons());

console.log(styles);
```

Then add a `package.json` script to generate the styles:

```json
{
  "scripts": {
    "build-css": "node css.js > /path/to/styles.css"
  }
}
```

Run `npm run build-css` to create your styles, and re-run whenever you make changes to your kit.

## Kits

Hibiscss generates css using _kits_, presets that map your visual language to functional css styles. Hibiscss comes with two kits bundled into the package:

* **default** ([docs](https://github.com/rosszurowski/hibiscss/blob/master/docs/default.md)): small, highly customizable kit
* **tachyons** ([docs](https://github.com/rosszurowski/hibiscss/blob/master/docs/tachyons.md)): familiar tachyons-like classes

Kits are functions which take options, and return css rules for hibiscss to generate. For example, using the default kit:

```js
import hibiscss from 'hibiscss';
import kit from 'hibiscss/default';

const config = {
  spacing: [0, 8, 16, 24, 48, 64],
  colors: { rausch: '#ff5a5f', foggy: '#767676' },
  fontSize: { title: 44, large: 24, regular: 19 },
  fontWeight: { light: 300, regular: 400, semibold: 600 }
};

const rules = kit(config);
const css = hibiscss(rules);
```

Will give you classes like:

```html
<div class="c-foggy mh-2 mh-4-m fs-title fw-semibold">Semibold and large</div>
```

Kits let you customize everything whether you can adjust line heights to how verbose the class names should be (eg. `mh-2` vs. `marginHorizontal-2`).

### Making a custom kit

If you'd like fine-grained control over the final css, you can write your own kit. Kits are simply a function that returns a set of rules, created with the `rule` helper function.

Check out [the custom kit example](https://github.com/rosszurowski/hibiscss/blob/master/examples/custom-kit.js), or read [the API docs](https://github.com/rosszurowski/hibiscss/blob/master/docs/api.md) to learn more.

## Motivation

[functional css](http://www.jon.gold/2015/07/functional-css/) makes css a lot of fun, but many of the toolkits out there are difficult to customize.

I found myself manually editing tachyons colours, typefaces, and breakpoints more times than I’d like. So I built  `hibiscss` to provide a simple structure for quickly generating functional css frameworks.

## See also

Lots of prior art in the functional css area:

* [tachyons](https://github.com/tachyons-css/tachyons/)
* [jongacnik/gr8](https://github.com/jongacnik/gr8)
* [basscss](https://github.com/basscss/basscss)

Hibiscss pairs nicely with:

* [polished](https://github.com/styled-components/polished), a utility kit for css-in-js

## License

MIT
