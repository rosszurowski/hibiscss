# hibiscss 🌸

A tool for making functional CSS stylesheets. Think [tachyons](http://tachyons.io), but customizable.

## Getting Started

Install it:

```bash
npm install hibiscss --save
```

For a quick start, use the [tachyons](#tachyons) rule kit. You can pass in options to define your project’s visual language:

```js
import hibiscss from 'hibiscss';
import tachyons from 'hibiscss/tachyons';

const styles = hibiscss(tachyons({
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

Yay! :tada:

Check out [the examples](https://github.com/rosszurowski/hibiscss/tree/master/examples) for more!

### Configuration

Hibiscss just outputs a string of CSS. To use the CSS, you could make use of [insert-css](https://github.com/substack/insert-css) or a similar tool. Or, what I prefer, is to make a static CSS file.

To do this, I make a js file with my config, like so:

```js
// css.js

import hibiscss from 'hibscss';
import tachyons from 'hibscss/tachyons';

const styles = hibiscss(tachyons());

console.log(styles)
```

Then add a `package.json` script to generate the styles, and re-run it whenever I change my project’s visual language.

```json
{
  "scripts": {
    "build-css": "node css.js > /path/to/styles.css"
  }
}
```

## Kits

`hibiscss` comes with two built-in kits for generating styles: a [`default` kit](#default-kit) and [`tachyons`](#tachyons).

Kits are presets of css you can customize. For example, the default kit (`hibiscss/default`) allows customizing colours, typefaces, the spacing scale, and more:

```js
import hibiscss from 'hibiscss';
import kit from from 'hibiscss/default';

const config = {
  spacing: [0, 8, 16, 24, 48, 64],
  colors: { rausch: '#ff5a5f', foggy: '#767676' },
  fontSize: { title: 44, large: 24, regular: 19 },
  fontWeight: { light: 300, regular: 400, semibold: 600 }
};

const css = hibiscss(kit(config));
```

Which gives you classes like:

```html
<div class="c-foggy mh-2 mh-4-m fs-title fw-semibold">Semibold and large</div>
```

Think of kits as css classes, and think of the configuration you use as your visual language. Kits let you customize everything whether you can adjust line heights to how verbose the class names should be (eg. `mh-2` vs. `marginHorizontal-2`).

### Default Kit

Documentation is still in progress.

#### `colors` (object)

```css
.c-black
.c-midGray
.c-moonGray
```

#### `fontFamily` (object)
#### `fontWeight` (object)

Defaults to `fw-normal` and `fw-bold`.

#### `fontSize` (object or array)

Defaults to `fs-13`, `fs-15`, `fs-18`, `fs-22`, `fs-27`, `fs-33`.

#### `letterSpacing` (object or array)
#### `lineHeight` (object or array)
#### `opacity` (object or array)

Defaults to 0%, 25%, 50%, 75%, and 100%

#### `maxWidths`
#### `spacing`
#### `borderRadius`

#### `verboseClasses` (boolean)

Whether to provide more verbose class names. This is helpful when working on a team that is less familiar with f(css).

Verbose class names are camel-cased versions of properties. Values are not affected.

```
.c-blue     →   .color-blue
.fs-22      →   .fontSize-22
.mh-auto    →   .marginHorizontal-auto
.xd-column  →   .flexDirection-column
.xa-center  →   .flexAlign-center
```

### Tachyons

The bundled tachyons kit generates a set of rules very similar to the [tachyons](http://tachyons.io/docs/) framework.

Options to document…

* `colors: object`
* `spacing: array`

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

This kit is still in progress. If you find a bug or an incompatability, [submit an issue!](https://github.com/rosszurowski/hibiscss/issues/new)

### Making a custom kit

You can also define a full rule-set from scratch if you'd like fine-grained control over all the CSS that gets generated. Kits are simply a function that returns a set of rules, created with the `rule` helper function.

Check out [the custom kit example](https://github.com/rosszurowski/hibiscss/blob/master/examples/custom-kit.js) to see more, or read [the API docs](#api).

## Docs

### Anatomy of a Rule

```
 ┌─ prefix (optional)      ┌─ key                  ┌─ value
 ▼                         ▼                       ▼
.u-             fontSize-  5   {   font-size   :   1.5   rem   }
                ▲                  ▲                      ▲
                └─ name            └─ property            └─ unit
```

## API

### `hibiscss(rules: Rule[], ?breakpoints): string`

Returns a css stylesheet from the given rules and breakpoints.

### `rule(name: string, property: string, values: mixed, ?options)`

Returns a `Rule` with the properties and values mapped out. `name` refers to the selector name, and `property` is the css property/properties it should apply to. `values` is a string, number, array, or object of values to use. The format of this variable determines the keys of the rule.

#### `values`

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

#### `options`

The `options` argument takes a set of flags that change how hibiscss interprets the rule. Allowed values are:

* `prefix: string`, an optional prefix to add to the selector. Useful when working with third party css or following naming conventions like [suitcss' utility classes](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md#u-utilityName)
* `responsive: boolean`, whether or not to group this rule into breakpoints and add suffixes (ie. `.name-a-{s,m,l}`)
* `unit: string`, when passing numbers as `values`, this unit will be applied. Setting `{ unit: 'rem' }` will cause an array like `[0, 1, 2]` to become `['0', '1rem', '2rem']`


## Motivation

[f(css)](http://www.jon.gold/2015/07/functional-css/) makes CSS a lot of fun, but many of the toolkits out there are difficult to customize.

I found myself manually editing tachyons colours, typefaces, and breakpoints more times than I’d like. So I built  `hibiscss` to provide a simple structure for quickly generating f(css) frameworks.

### Goals

1. **Quick**. This should work for a quick prototype or a complex system. Starting should be simple as a copy-paste, be it a `<link />` or a whole file), and easy to refine the visual system as you go.
2. **Extensible**. One should be able to express the pieces of a complex design system in here. It should mesh into team philosophies and opinions (concise naming vs. full naming).
3. **Collaborative**. Customizable selectors means language can be shared between designers and engineers (“headline”, “coral red”). Writing it in js leaves room for atomic styleguides to be generated from the rules.
4. **Performant**. Not 87kB of CSS. Drop the code you don’t need.

## See also

Lots of prior art in the f(css) area:

* [tachyons](https://github.com/tachyons-css/tachyons/)
* [jongacnik/gr8](https://github.com/jongacnik/gr8)
* [basscss](https://github.com/basscss/basscss)

Pairs nicely with:

* [polished](https://github.com/styled-components/polished), a utility kit for css-in-js

In use:

* [watsi.org](https://watsi.org)
* [rosszurowski.com](https://rosszurowski.com)

## License

MIT
