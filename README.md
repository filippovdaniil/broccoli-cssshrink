# broccoli-cssshrink

This is a simple [broccoli](https://github.com/broccolijs/broccoli) wrapper for the [cssshrink](https://github.com/stoyan/cssshrink) CSS minifier.

## Installation

```bash
npm i --save-dev broccoli-cssshrink
```

## Usage

Plugin takes a broccoli tree as it's first argument and looks for the all `*.css` files in it by default.

`Brocfile.js`
```js
var cssshrink = require( 'broccoli-cssshrink' );

// bigCss is a tree from the any broccoli plugin (broccoli-sass, for example)
var minCss = cssshrink( bigCss );

// ... and export minCss tree
```

## Documentation

### `CSSShrink( inputTree, options )`

Optional parameters:

---

`[options.input]` *{Array|String}*

An array of glob patterns, or a simple glob string for CSS files to minify (must exists at least one file for the each search pattern).

Default value: `'**/*.css'`

---

`[options.debug]` *{Boolean}*

Controls the output of a debug information (percentage of compression for the each file).

Default value: `false`

---

`[options.comment]` *{String}*

A comment string at the beginning of all minified CSS files.

Default value: `''`

## License

This project is distributed under the MIT license.
