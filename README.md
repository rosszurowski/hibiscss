# LHC

A generator for functional CSS.

## Getting Started

```js
import lhc from 'lhc';

const colors = { blue: '#00f', red: '#f00' };
const spacing = [0, 2, 4, 8, 16, 24];
const fontWeight = { light: 300, regular: 400, semibold: 600 };

const css = lhc.generate({ colors, spacing, fontWeight }, { verbose: true });

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

const css = lhc.generate(rules);
```

LHC will take care of the AST, generating the CSS, and grouping rules into media queries, leaving you to declaratively define the rules you want.

## Motivation

Functional CSS is amazing. But it's not enough to drop the same preset CSS into every project.

Every new project I spend a bunch of time customizing f(css) frameworks for the properties that I need:

* Colors
* Typefaces
* Spacing scale
* Breakpoints
* Compact class names (`lh-tight`, `ma-4-s`) or verbose ones
* Removing variables I never use ([this](http://tachyons.io/docs/themes/box-shadow/) or [this](http://tachyons.io/docs/layout/clearfix/), for example) to save bandwidth

These things change depending on the team size and experience, brand, and all sorts of factors.

LHC lets you generate your own CSS lib from configuration you put in.

Everything it spits out is customizable, but it comes with some sane defaults to get you configuring the most important things first (colors, spacing, fonts)

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

## Further Reading

Some functional CSS projects:

* [Tachyons](https://github.com/tachyons-css/tachyons/)
* [jongacnik/gr8](https://github.com/jongacnik/gr8)
* [basscss](https://github.com/basscss/basscss)

Some writing about functional CSS:

* [Immutable CSS by Harry Roberts](https://csswizardry.com/2015/03/immutable-css/)
* [Functional CSS by Jon Gold](http://www.jon.gold/2015/07/functional-css/)
* [Functional CSS at Wealthfront](http://eng.wealthfront.com/2013/08/20/functional-css-fcss/)
* [BassCSS Principles](http://basscss.com/v7/docs/reference/principles/)
