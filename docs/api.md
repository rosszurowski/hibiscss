# API

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

When `values` is an object (`{ r: 'relative', a: 'absolute' }`), hibiscss returns a set of selectors like this:

```css
.name-r { property: relative; }
.name-a { property: absolute; }
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
