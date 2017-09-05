# lhcss 🚉

A composable toolkit for generating functional CSS.

```bash
npm install lhcss --save
```

## Getting Started

For a quick start use the [hadron](#hadron) rule kit:

```js
import lhcss from 'lhcss';
import hadron from 'lhcss/hadron';

const css = lhcss(hadron());

// pipe the css out to a file, perhaps?
process.stdout.write(css);
```

Then you can use the classes like so:

```html
<div class="c-blue mh-2 mh-4-m">Hello world!</div>
```

Yay! :tada:

### Customization

`lhcss` was built to be flexible. You can pass options to define your project's visual language:

```js
const config = {
  colors: {
    pink: '#ffb7b3',
    black: '#141414'
  },
  fontFamily: { work: 'Work Sans, -apple-system, sans-serif' },
  fontSize: [36, 24, 19, 17, 15, 12]
}

const css = lhcss(hadron(config));
```

```html
<div class="c-pink ff-work fs-2">Work Sans in pink at 24px!</div>
```

You can find [options for hadron below](#hadron).

If you’re familiar with tachyons, use the (mostly) compatible [tachyons rule kit](#tachyons), or [check out the examples](https://github.com/rosszurowski/lhcss/tree/master/examples) for more!

## Kits

`lhcss` comes with two built-in kits for generating styles: [`hadron`](#hadron) and [`tachyons`](#tachyons).

Kits are presets of css you can customize. Hadron, for instance, lets you customize colours, typefaces, the spacing scale, and more:

```js
import lhcss from 'lhcss';
import hadron from from 'lhcss/hadron';

const config = {
  spacing: [0, 8, 16, 24, 48, 64],
  colors: { rausch: '#ff5a5f', foggy: '#767676' },
  fontSize: { title: 44, large: 24, regular: 19 },
  fontWeight: { light: 300, regular: 400, semibold: 600 }
};

const css = lhcss(hadron(config));
```

Which gives you classes like:

```html
<div class="c-foggy mh-2 mh-4-m fs-title fw-semibold">Semibold and large</div>
```

Think of kits as css classes, and think of the configuration you use as your visual language. Kits let you customize everything whether you can adjust line heights to how verbose the class names should be (eg. `mh-2` vs. `marginHorizontal-2`).

### Hadron

Options to document…

* `colors: object`
* `fontFamily: object`
* `fontWeight: object`
* `fontSize: object`
* `lineHeight: object`
* `opacity: array`
* `sizes: array`
* `spacing: array`

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

/* lhcss */
.f-1 { ... }
.fw-4 { ... }
.tt-c { ... }
.georgia { ... }
```

This kit is still in progress. If you find a bug, [submit an issue!](https://github.com/rosszurowski/lhc/issues/new)

### Making a custom kit

You can also define a full rule-set from scratch if you'd like fine-grained control over all the CSS that gets generated. Kits are simply a function that returns a set of rules, created with the `rule` helper function.

Check out [the custom kit example](https://github.com/rosszurowski/lhc/blob/master/examples/custom-kit.js) to see more, or read [the API docs](#api).

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

### `lhcss(rules: Rule[], ?breakpoints): string`

Returns a css stylesheet from the given rules and breakpoints.

### `rule(name: string, property: string, values: mixed, ?options)`

Returns a `Rule` with the properties and values mapped out. `name` refers to the selector name, and `property` is the css property/properties it should apply to. `values` is a string, number, array, or object of values to use. The format of this variable determines the keys of the rule.

#### `values`

When `values` is an object (`{ yo: 'relative', dawg: 'absolute' }`), lhcss returns a set of selectors like this:

```css
.name-yo { property: relative; }
.name-dawg { property: absolute; }
```

When `values` is an array (`[0, 4, 8, 16]`), lhcss returns a set of selectors like this:

```css
.name-0 { property: 0; }
.name-1 { property: 4px; }
.name-2 { property: 8px; }
.name-3 { property: 16px; }
```

When `values` is a string or number like `block`, lhcss returns a single selector _without a key_:

```css
.name { property: block; }
```

#### `options`

The `options` argument takes a set of flags that change how lhcss interprets the rule. Allowed values are:

* `prefix: string`, an optional prefix to add to the selector. Useful when working with third party css or following naming conventions like [suitcss' utility classes](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md#u-utilityName)
* `responsive: boolean`, whether or not to group this rule into breakpoints and add suffixes (ie. `.name-a-{s,m,l}`)
* `unit: string`, when passing numbers as `values`, this unit will be applied. Setting `{ unit: 'rem' }` will cause an array like `[0, 1, 2]` to become `['0', '1rem', '2rem']`


## Motivation

[f(css)](http://www.jon.gold/2015/07/functional-css/) makes CSS a lot of fun, but many of the toolkits out there are difficult to customize.

For each project, I found myself manually spitting out the tachyons css, adjust colour and typefaces, removing unused rules, tweaking breakpoints, etc. I’ve also found myself in situations with other devs who aren’t comfortable with tachyons’ concise class names.

I got tired of doing this, so I build  `lhcss` to provide a simple structure for quickly generating f(css) frameworks in js.

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
