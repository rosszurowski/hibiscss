## Default Kit

A highly-customizable kit with some sane defaults, intended for a quick and easy start.

### Features

* **smart defaults**: enough to quickly get started
* **flexible**: easy to add in styles as needed
* **adoptable**: specifying [verbose or concise class names](#verbose-classes) makes it easy for new developers to adopt

## Usage

Here’s an example configuration with default options for all the values.

```js
const config = {
  colors: {},
  borderRadius: {},
  fontFamily: {
    sans: `-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Ubuntu, Roboto, Noto, 'Segoe UI', Arial, sans-serif`,
    serif: `Georgia, Times, serif`,
  },
  fontSize: {
    12: '12px',
    14: '14px',
    16: '16px',
    20: '20px',
    36: '36px',
    48: '48px',
    80: '80px',
    96: '96px',
  },
  fontWeight: {
    normal: 'normal',
    bold: 'bold',
  },
  letterSpacing: {},
  lineHeight: {
    '1.0': 1.0,
    '1.25': 1.25,
    '1.5': 1.5,
  },
  opacity: {
    '0%': 0.0,
    '25%': 0.25,
    '50%': 0.5,
    '75%': 0.75,
    '100%': 1.0,
  },
  maxWidths: [],
  sizes: {},
  spacing: [0, 4, 8, 16, 32, 64, 128],
  verboseClassNames: false,
}
```

## Documentation

Documentation is still in progress. [Submit an issue](/rosszurowski/hibiscss/issues) if something is missing or [pull request](/rosszurowski/hibiscss/pulls) if you'd like to help!

Classes that are generate

<details id="colors">
<summary><strong>colors</strong></summary>

**Concise**

Text color classes

```
.c-blue { color: #00f; }
.c-red  { color: #f00; }
```

**Verbose**

```css
.color-blue { color: #00f; }
.color-red  { color: #f00; }
```

</details>

<details id="spacing">
<summary><strong>spacing</strong></summary>

Spacing scale classes for `margin` and `padding` (top, left, bottom, right, horizontal, vertical, all).

**Concise**

```css
.ma-0 { margin: 0 }
.ma-1 { margin: 4px }
.ma-2 { margin: 8px }
.ma-3 { margin: 16px }
.ma-4 { margin: 32px }
.ma-5 { margin: 64px }
.ma-6 { margin: 128px }
.mt-0 { margin-top: 0 }
.mt-1 { margin-top: 4px }
.mt-2 { margin-top: 8px }
.mt-3 { margin-top: 16px }
.mt-4 { margin-top: 32px }
.mt-5 { margin-top: 64px }
.mt-6 { margin-top: 128px }
.ml-0 { margin-left: 0 }
.ml-1 { margin-left: 4px }
.ml-2 { margin-left: 8px }
.ml-3 { margin-left: 16px }
.ml-4 { margin-left: 32px }
.ml-5 { margin-left: 64px }
.ml-6 { margin-left: 128px }
.mr-0 { margin-right: 0 }
.mr-1 { margin-right: 4px }
.mr-2 { margin-right: 8px }
.mr-3 { margin-right: 16px }
.mr-4 { margin-right: 32px }
.mr-5 { margin-right: 64px }
.mr-6 { margin-right: 128px }
.mb-0 { margin-bottom: 0 }
.mb-1 { margin-bottom: 4px }
.mb-2 { margin-bottom: 8px }
.mb-3 { margin-bottom: 16px }
.mb-4 { margin-bottom: 32px }
.mb-5 { margin-bottom: 64px }
.mb-6 { margin-bottom: 128px }
.mh-0 { margin-left: 0; margin-right: 0 }
.mh-1 { margin-left: 4px; margin-right: 4px }
.mh-2 { margin-left: 8px; margin-right: 8px }
.mh-3 { margin-left: 16px; margin-right: 16px }
.mh-4 { margin-left: 32px; margin-right: 32px }
.mh-5 { margin-left: 64px; margin-right: 64px }
.mh-6 { margin-left: 128px; margin-right: 128px }
.mv-0 { margin-top: 0; margin-bottom: 0 }
.mv-1 { margin-top: 4px; margin-bottom: 4px }
.mv-2 { margin-top: 8px; margin-bottom: 8px }
.mv-3 { margin-top: 16px; margin-bottom: 16px }
.mv-4 { margin-top: 32px; margin-bottom: 32px }
.mv-5 { margin-top: 64px; margin-bottom: 64px }
.mv-6 { margin-top: 128px; margin-bottom: 128px }
.ml-auto { margin-left: auto }
.mr-auto { margin-right: auto }
.mh-auto { margin-left: auto; margin-right: auto }
.mv-auto { margin-top: auto; margin-bottom: auto }

.pa-0 { padding: 0 }
.pa-1 { padding: 4px }
.pa-2 { padding: 8px }
.pa-3 { padding: 16px }
.pa-4 { padding: 32px }
.pa-5 { padding: 64px }
.pa-6 { padding: 128px }
.pt-0 { padding-top: 0 }
.pt-1 { padding-top: 4px }
.pt-2 { padding-top: 8px }
.pt-3 { padding-top: 16px }
.pt-4 { padding-top: 32px }
.pt-5 { padding-top: 64px }
.pt-6 { padding-top: 128px }
.pl-0 { padding-left: 0 }
.pl-1 { padding-left: 4px }
.pl-2 { padding-left: 8px }
.pl-3 { padding-left: 16px }
.pl-4 { padding-left: 32px }
.pl-5 { padding-left: 64px }
.pl-6 { padding-left: 128px }
.pr-0 { padding-right: 0 }
.pr-1 { padding-right: 4px }
.pr-2 { padding-right: 8px }
.pr-3 { padding-right: 16px }
.pr-4 { padding-right: 32px }
.pr-5 { padding-right: 64px }
.pr-6 { padding-right: 128px }
.pb-0 { padding-bottom: 0 }
.pb-1 { padding-bottom: 4px }
.pb-2 { padding-bottom: 8px }
.pb-3 { padding-bottom: 16px }
.pb-4 { padding-bottom: 32px }
.pb-5 { padding-bottom: 64px }
.pb-6 { padding-bottom: 128px }
.ph-0 { padding-left: 0; padding-right: 0 }
.ph-1 { padding-left: 4px; padding-right: 4px }
.ph-2 { padding-left: 8px; padding-right: 8px }
.ph-3 { padding-left: 16px; padding-right: 16px }
.ph-4 { padding-left: 32px; padding-right: 32px }
.ph-5 { padding-left: 64px; padding-right: 64px }
.ph-6 { padding-left: 128px; padding-right: 128px }
.pv-0 { padding-top: 0; padding-bottom: 0 }
.pv-1 { padding-top: 4px; padding-bottom: 4px }
.pv-2 { padding-top: 8px; padding-bottom: 8px }
.pv-3 { padding-top: 16px; padding-bottom: 16px }
.pv-4 { padding-top: 32px; padding-bottom: 32px }
.pv-5 { padding-top: 64px; padding-bottom: 64px }
.pv-6 { padding-top: 128px; padding-bottom: 128px }
```

**Verbose**

```css
.margin-0 { margin: 0 }
.margin-1 { margin: 4px }
.margin-2 { margin: 8px }
.margin-3 { margin: 16px }
.margin-4 { margin: 32px }
.margin-5 { margin: 64px }
.margin-6 { margin: 128px }
.marginTop-0 { margin-top: 0 }
.marginTop-1 { margin-top: 4px }
.marginTop-2 { margin-top: 8px }
.marginTop-3 { margin-top: 16px }
.marginTop-4 { margin-top: 32px }
.marginTop-5 { margin-top: 64px }
.marginTop-6 { margin-top: 128px }
.marginLeft-0 { margin-left: 0 }
.marginLeft-1 { margin-left: 4px }
.marginLeft-2 { margin-left: 8px }
.marginLeft-3 { margin-left: 16px }
.marginLeft-4 { margin-left: 32px }
.marginLeft-5 { margin-left: 64px }
.marginLeft-6 { margin-left: 128px }
.marginRight-0 { margin-right: 0 }
.marginRight-1 { margin-right: 4px }
.marginRight-2 { margin-right: 8px }
.marginRight-3 { margin-right: 16px }
.marginRight-4 { margin-right: 32px }
.marginRight-5 { margin-right: 64px }
.marginRight-6 { margin-right: 128px }
.marginBottom-0 { margin-bottom: 0 }
.marginBottom-1 { margin-bottom: 4px }
.marginBottom-2 { margin-bottom: 8px }
.marginBottom-3 { margin-bottom: 16px }
.marginBottom-4 { margin-bottom: 32px }
.marginBottom-5 { margin-bottom: 64px }
.marginBottom-6 { margin-bottom: 128px }
.marginHorizontal-0 { margin-left: 0; margin-right: 0 }
.marginHorizontal-1 { margin-left: 4px; margin-right: 4px }
.marginHorizontal-2 { margin-left: 8px; margin-right: 8px }
.marginHorizontal-3 { margin-left: 16px; margin-right: 16px }
.marginHorizontal-4 { margin-left: 32px; margin-right: 32px }
.marginHorizontal-5 { margin-left: 64px; margin-right: 64px }
.marginHorizontal-6 { margin-left: 128px; margin-right: 128px }
.marginVertical-0 { margin-top: 0; margin-bottom: 0 }
.marginVertical-1 { margin-top: 4px; margin-bottom: 4px }
.marginVertical-2 { margin-top: 8px; margin-bottom: 8px }
.marginVertical-3 { margin-top: 16px; margin-bottom: 16px }
.marginVertical-4 { margin-top: 32px; margin-bottom: 32px }
.marginVertical-5 { margin-top: 64px; margin-bottom: 64px }
.marginVertical-6 { margin-top: 128px; margin-bottom: 128px }
.marginLeft-auto { margin-left: auto }
.marginRight-auto { margin-right: auto }
.marginHorizontal-auto { margin-left: auto; margin-right: auto }
.marginVertical-auto { margin-top: auto; margin-bottom: auto }
```
</details>

<details id="typography">
<summary><strong>typography</strong></summary>

Spacing scale classes for `margin` and `padding` (top, left, bottom, right, horizontal, vertical, all).

```css
.ff-sans { font-family: sans-serif; }
.ff-serif { font-family: serif; }

.fw-normal { font-weight: normal; }
.fw-bold { font-weight: bold; }

.fs-12 { font-size: 12px; }
.fs-14 { font-size: 14px; }
.fs-16 { font-size: 16px; }
.fs-20 { font-size: 20px; }
.fs-36 { font-size: 36px; }
.fs-48 { font-size: 48px; }
.fs-80 { font-size: 80px; }
.fs-96 { font-size: 96px; }

/* letter spacing not set by default, needs the `letterSpacing` prop to define, but selectors will look like this */
.ls-0d1 { letter-spacing: 0.1px; }
.ls-1 { letter-spacing: 1px; }

.lh-1d0 { line-height: 1.0; }
.lh-1d25 { line-height: 1.25; }
.lh-1d5 { line-height: 1.5; }
```

</details>

<details id="appearance">
<summary><strong>appearance</strong></summary>

Classes for `opacity` and `border-radius`.

```css
.o-0p { opacity: 0.0; }
.o-25p { opacity: 0.25; }
.o-50p { opacity: 0.5; }
.o-75p { opacity: 0.75; }
.o-100p { opacity: 1.0; }
```

```css
/* border radius not set by default, needs the `borderRadius` prop to define, but selectors will can look like this */
.br-0 { border-radius: 0; }
.br-3 { border-radius: 3px; }
.br-pill { border-radius: 9999px; }
```

</details>


### Verbose classes

This kit provides a flag to use more verbose class names (eg. `margin-0` vs. `m-0`). This can help when working with others who may be less familiar with functional css and find the concise approach confusing.

Verbose class names are camel-cased versions of properties. Values are not affected.

```
.c-blue     →   .color-blue
.fs-22      →   .fontSize-22
.ma-2       →   .margin-2
.mh-auto    →   .marginHorizontal-auto
.xd-column  →   .flexDirection-column
.xa-center  →   .flexAlign-center
```

You can use this flag like so:

```jsx
import hibiscss from 'hibiscss';
import kit from 'hibiscss/default';

const styles = hibiscss(kit({ verboseClassNames: true }));
```
