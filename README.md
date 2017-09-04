# Hibiscus 🌺

A tool for generating functional CSS kits.

```bash
npm install lhc --save
```

## Getting Started

Generate styles by calling `lhc` with a set of rules. To get a quick start, you can use the default pack, hadron:

```js
import lhc from 'lhc';
import hadron from 'lhc/hadron';

const config

const css = lhc(hadron(config));

// Pipe the css out to a file
process.stdout.write(css);
```

You can also generate tachyons-style selectors with the `lhc/tachyons` pack:

```js
import tachyons from 'lhc/tachyons';

const css = lhc(tachyons(config));
```

### Hadron

A 

```

const config = {
  colors,
  spacing,

};

const styles = lhc(tachyons(config));
const output = csso.minify(styles);
```

```js
import lhc, { defaultRules } from 'lhc';

const colors = { blue: '#00f', red: '#f00' };
const spacing = [0, 2, 4, 8, 16, 24];
const fontWeight = { light: 300, regular: 400, semibold: 600 };

const css = lhc(defaultRules({ colors, spacing, fontWeight }), { verbose: true });

// `css` is now a minified string of CSS
console.log(css);
```

You can also define a full rule-set from scratch if you'd like fine-grained control over all the CSS that gets generated.

```js
import lhc, { rule } from 'lhc';

const rules = [
  rule('d', 'display', { none: 'none', inlineBlock: 'inline-block', block: 'block' }, { responsive: true }),
  rule('p', 'position', { relative: 'relative', absolute: 'absolute' }),
];

const css = lhc(rules);
```

LHC will take care of the AST, generating the CSS, and grouping rules into media queries, leaving you to declaratively define the rules you want.

## Why?

* **Flexible**:
* **Small**: the default preset comes out to ~1kB gzipped
* **JS-only**: integrates f(css) nicely with CSS-in-JS tools

## Motivation

[f(css)](http://www.jon.gold/2015/07/functional-css/) makes CSS a lot of fun, but many of the toolkits out there are difficult to customize.

For each project, I found myself manually spitting out the tachyons css, adjust colour and typefaces, removing unused rules, tweaking breakpoints, etc. I’ve also found myself in situations with other devs who aren’t comfortable with tachyons’ concise class names.

Hibiscus is a compassable toolkit for generating your own f(css) kit from simple js configuration.

Everything it spits out is customizable, but it comes with a few [starter packs](#) to get you moving quickly with basic customization (colors, spacing, fonts).

[Check out the examples](#) for more!

## Goals

1. **Quick**. This should work for a quick prototype or a complex system. Starting should be simple as a copy-paste, be it a `<link />` or a whole file). Customizing it shouldn’t make you worry about breaking things. You should be able to refine your system in the context of the final design.
2. **Extensible**. One should be able to express the pieces of a complex design system in here. It should mesh into team philosophies and opinions (concise naming vs. full naming).
3. **Collaborative**. This should make it easy for designers and engineers to work together. Language can be shared (“headline”, “coral red”). Atomic styleguides can be generated.
4. **Performant**. Not 87kB of CSS. It’d be great to drop the stuff that’s unneeded.


### Anatomy of a Rule

A rule

```
 ┌─ prefix (optional)      ┌─ property key        ┌─ value
 ▼                        ▼                      ▼
.u-             fontSize-  5   {   font-size   :   1.5   rem   }
                ▲                 ▲                     ▲
                └─ property name   └─ property           └─ unit
```



#### Colors

* Text color
* Background color
* Border color

#### Appearance

* Border radius
* Background position, size, repeat
* Display
* Opacity
* Overflow
* z-index

#### Layout

* Flexbox
* Spacing (margin, padding, negative margin, auto)
* Widths (percentages, absolute sizes)
* Position (`top: 0`, `-fill`)
* Floats

### Modifiers

* Prefix
    * **Utility class prefix** (`u-`) for following SUITCSS
    * **Namespacing** (eg. `twt-`) if you work with external CSS, etc
* Breakpoints (`-s`, `-m`, `-l` as defaults, what widths?)

## How to handle…

* Global resets (box-sizing, , etc)
* Hover/focus/active states?
* Background images, etc?

## See also

Pairs nicely with:

* [rosszurowski/vanilla](https://github.com/rosszurowski/vanilla), a browser-wide reset designed for functional css

Functional CSS:

* [tachyons](https://github.com/tachyons-css/tachyons/)
* [basscss](https://github.com/basscss/basscss)
* [jongacnik/gr8](https://github.com/jongacnik/gr8)

In use:

* [watsi.org](https://watsi.org)
