<h1 align="center">
	<img width="600" src="https://cdn.rawgit.com/rosszurowski/hibiscss/337654f1/media/logo.svg" alt="Hibiscss" />
	<br />
</h1>

> Functional css generator

[![Build Status](https://travis-ci.org/rosszurowski/hibiscss.svg?branch=master)](https://travis-ci.org/rosszurowski/hibiscss)

Functional css (ie. [tachyons](http://tachyons.io)), but easily customizable for your project's visual language. No more rewriting long stylesheets to include your colors, typefaces, and spacing scale! 🌺


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

const styles = hibiscss(kkit({
  colors: {
    pink: '#ffb7b3',
    black: '#141414'
  },
  fontFamily: {
    work: 'Work Sans, -apple-system, sans-serif'
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

Hibiscss only gives you a string of css. You can integrate it with your build system however, but the easiest is to spit out a static css file, like so:

Make a file with your config and output it to `console.log`, like so:

```js
// css.js

import hibiscss from 'hibscss';
import tachyons from 'hibscss/tachyons';

const styles = hibiscss(tachyons());

console.log(styles);
```

Then add a `package.json` script to generate the styles, and re-run it whenever I change my project’s visual language.

```json
{
  "scripts": {
    "build-css": "node css.js > /path/to/styles.css"
  }
}
```

Run `npm run build-css` to make the file or update it when you make changes to your kit.

## Kits

Hibiscss generates css using _kits_, presets that map a visual language you define to a bunch of css styles. Hibiscss comes with two kits bundled into the package:

* **default** ([docs](https://github.com/rosszurowski/hibiscss/blob/master/docs/default.md)): small, highly customizable kit
* **tachyons** ([docs](https://github.com/rosszurowski/hibiscss/blob/master/docs/tachyons.md)): familiar tachyons-like classes

Kits are just functions that take a bunch of options, returning rules for hibiscss to generate. For example, using the default kit:

```js
import hibiscss from 'hibiscss';
import kit from 'hibiscss/default';

const config = {
  spacing: [0, 8, 16, 24, 48, 64],
  colors: { rausch: '#ff5a5f', foggy: '#767676' },
  fontSize: { title: 44, large: 24, regular: 19 },
  fontWeight: { light: 300, regular: 400, semibold: 600 }
};

const css = hibiscss(kit(config));
```

Will give you classes like:

```html
<div class="c-foggy mh-2 mh-4-m fs-title fw-semibold">Semibold and large</div>
```

Kits let you customize everything whether you can adjust line heights to how verbose the class names should be (eg. `mh-2` vs. `marginHorizontal-2`).

### Making a custom kit

You can also define a full rule-set from scratch if you'd like fine-grained control over all the css that gets generated. Kits are simply a function that returns a set of rules, created with the `rule` helper function.

Check out [the custom kit example](https://github.com/rosszurowski/hibiscss/blob/master/examples/custom-kit.js) to see more, or read [the API docs](#api).

## Docs

### Anatomy of a Rule

Hibiscss thinks about functional css rules in these terms:

```
 ┌─ prefix (optional)      ┌─ key                  ┌─ value
 ▼                         ▼                       ▼
.u-             fontSize-  5   {   font-size   :   1.5   rem   }
                ▲                  ▲                      ▲
                └─ name            └─ property            └─ unit
```

## API

#### `hibiscss(rules: Rule[], ?breakpoints): string`

Returns a css stylesheet from the given rules and breakpoints.

#### `rule(name: string, property: string, values: mixed, ?options)`

Returns a `Rule` with the properties and values mapped out. `name` refers to the selector name, and `property` is the css property/properties it should apply to. `values` is a string, number, array, or object of values to use. The format of this variable determines the keys of the rule.

##### `values`

When `values` is an object (`{ yo: 'relative', dawg: 'absolute' }`), hibiscss returns a set of selectors like this:

```css
.name-yo { property: relative; }
.name-dawg { property: absolute; }
```

When `values` is an array (`[0, 4, 8, 16]`), hibiscss returns a set of selectors like this:

```css
.name-0 { property: 0; }
.name-1 { property: 4px; }
.name-2 { property: 8px; }
.name-3 { property: 16px; }
```

When `values` is a string or number like `block`, hibiscss returns a single selector _without a key_:

```css
.name { property: block; }
```

##### `options`

The `options` argument takes a set of flags that change how hibiscss interprets the rule. Allowed values are:

* `prefix: string`, an optional prefix to add to the selector. Useful when working with third party css or following naming conventions like [suitcss' utility classes](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md#u-utilityName)
* `responsive: boolean`, whether or not to group this rule into breakpoints and add suffixes (ie. `.name-a-{s,m,l}`)
* `unit: string`, when passing numbers as `values`, this unit will be applied. Setting `{ unit: 'rem' }` will cause an array like `[0, 1, 2]` to become `['0', '1rem', '2rem']`


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
