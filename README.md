# lhcss 🚉

A composable toolkit for generating functional CSS.

```bash
npm install lhcss --save
```

## Getting Started

For a quick start, use the bundled rule kit, [hadron](#hadron):

```js
import lhcss from 'lhcss';
import hadron from 'lhcss/hadron';

const css = lhcss(hadron());

// Pipe the css out to a file
process.stdout.write(css);
```

And use the classes like so:

```html
<div class="c-blue mh-2 mh-4-m fw-regular">Hello world!</div>
```

**Customization**

Hadron was built to be flexible. Using rule kits, you can pass in options to define a visual language:

```js
const config = {
  colors: {
    pink: '#ffb7b3',
    black: '#141414'
  },
  fontFamily: {
    work: 'Work Sans, -apple-system, sans-serif'
  }
}

const css = lhcss(hadron(config));
```

```html
<div class="c-pink ff-work">Work Sans in Pink!</div>
```

You can find [options for hadron below](#).

If you’re familiar with tachyons, use the (mostly) compatible [tachyons rule kit](#tachyons), or [check out the examples](https://github.com/rosszurowski/lhcss/tree/master/examples) for more!

## Kits

`lhcss` comes with two built-in kits for generating styles: [`hadron`](#hadron) and [`tachyons`](#tachyons).

Kits are functions that return [css rules](#), configuring the output with options. Hadron, for instance, lets you customize colours, typefaces, and the spacing scale:

```js
import lhcss from 'lhcss';
import hadron from from 'lhcss/hadron';

const colors = { blue: '#00f', red: '#f00' };
const spacing = [0, 4, 8, 16, 32, 64];
const fontFamily = { sans: 'Work Sans, -apple-system, sans-serif' };
const fontWeight = { light: 300, regular: 400, semibold: 600 };

console.log(lhcss(hadron({ colors, spacing, fontFamily, fontWeight })));
```

For classes like:

```html
<div class="c-blue mh-2 mh-4-m fw-semibold">Hello world!</div>
```

### Hadron

To be written...

### Tachyons

The bundled tachyons kit generates a set of rules very similar to the [tachyons](http://tachyons.io/docs/) framework.

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

## API

### Anatomy of a Rule

```
 ┌─ prefix (optional)      ┌─ property key         ┌─ value
 ▼                         ▼                       ▼
.u-             fontSize-  5   {   font-size   :   1.5   rem   }
                ▲                  ▲                      ▲
                └─ property name   └─ property           └─ unit
```


### `rule(name: string, property: string, values, [options])`

```js
import lhcss, { rule } from 'lhcss';

const colors = { ... };
const spacing = [ ... ];

function kit (options) {
  return [
    rule('bc', 'background-color', colors),
    rule('c', 'color', colors),
  ];
}

const styles = lhcss(kit());
```

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
* [rosszurowski/vanilla](https://github.com/rosszurowski/vanilla), a browser-wide reset meant for functional css

In use:

* [watsi.org](https://watsi.org)
