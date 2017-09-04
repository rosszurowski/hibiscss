# LHC 🚉

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

You can also generate [tachyons](http://tachyons.io/)-style selectors with the `lhc/tachyons` pack:

```js
import tachyons from 'lhc/tachyons';

const css = lhc(tachyons(config));
```

### Kits

LHC comes with two built-in kits for generating styles: `hadron` and `tachyons`.

Kits are simply functions that return a bunch of [rules](#), and take options to configure them. Hadron, for instance, lets you customize the colours, typefaces, and spacings with an object.

```js
import lhc from 'lhc';
import hadron from from 'lhc/hadron';

const colors = { blue: '#00f', red: '#f00' };
const spacing = [0, 2, 4, 8, 16, 24];
const fontWeight = { light: 300, regular: 400, semibold: 600 };

const config = { colors, spacing, fontFamily };

console.log(lhc(hadron(config)));
```

Which spits out classes like:

```css
.c-blue { color: #0ff; }
.c-red { color: #f00; }

.mh-5 { margin-left: 24px; margin-right: 24px; }
```



Tachyons is all the rules from [tachyons](http://tachyons.io/docs/) CSS, but configured to follow LHC's [rule anatomy](#anatomy-of-a-rule): `.prefix-prop-value-suffix { ... }`. So it looks like this:

```css
.bc-red   { background-color: red; }
.bc-green { background-color: green; }
.bc-blue  { background-color: blue; }
```

You can also define a full rule-set from scratch if you'd like fine-grained control over all the CSS that gets generated.

```js
import lhc, { rule } from 'lhc';

const colors = { blue: '#00f', red: '#f00' };
const spacing = [0, 2, 4, 8, 16, 24];

const rules = [
  // rule(selector, property, values, options)
  rule('bc', 'background-color', colors),
  rule('c', 'color', colors),

  rule('ma', 'margin', spacing, { responsive: true, unit: 'px' }),
  rule('p', 'position', { relative: 'relative', absolute: 'absolute' }, { responsive: true }),
];

const css = lhc(rules);
```

LHC will take care of the AST, generating the CSS, and grouping rules into media queries, leaving you to declaratively define the rules you want.

## Why?

* **Flexible**:
* **Small**: the default preset comes out to ~1kB gzipped
* **Everything in JS**: integrates f(css) nicely with CSS-in-JS tools

## Motivation

[f(css)](http://www.jon.gold/2015/07/functional-css/) makes CSS a lot of fun, but many of the toolkits out there are difficult to customize.

For each project, I found myself manually spitting out the tachyons css, adjust colour and typefaces, removing unused rules, tweaking breakpoints, etc. I’ve also found myself in situations with other devs who aren’t comfortable with tachyons’ concise class names.

LHC is a composable toolkit for generating your own f(css) kit from simple js configuration.

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
 ┌─ prefix (optional)      ┌─ property key         ┌─ value
 ▼                         ▼                       ▼
.u-             fontSize-  5   {   font-size   :   1.5   rem   }
                ▲                  ▲                      ▲
                └─ property name   └─ property           └─ unit
```

## See also

Pairs nicely with:

* [polished](https://github.com/styled-components/polished), a utility kit for css-in-js
* [rosszurowski/vanilla](https://github.com/rosszurowski/vanilla), a browser-wide reset designed for functional css

Functional CSS:

* [tachyons](https://github.com/tachyons-css/tachyons/)
* [basscss](https://github.com/basscss/basscss)
* [jongacnik/gr8](https://github.com/jongacnik/gr8)

In use:

* [watsi.org](https://watsi.org)
