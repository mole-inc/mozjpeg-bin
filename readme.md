# mozjpeg-bin ![Node CI](https://github.com/mole-inc/mozjpeg-bin/workflows/Node%20CI/badge.svg)

> [mozjpeg](https://github.com/mozilla/mozjpeg) is a production-quality JPEG encoder that improves compression while maintaining compatibility with the vast majority of deployed decoders

You probably want [`imagemin-mozjpeg`](https://github.com/mole-inc/imagemin-mozjpeg) instead.


## Install

```
$ npm install @mole-inc/mozjpeg
```


## Usage

```js
const {execFile} = require('child_process');
const mozjpeg = require('@mole-inc/mozjpeg');

execFile(mozjpeg, ['-outfile', 'output.jpg', 'input.jpg'], err => {
	console.log('Image minified!');
});
```


## CLI

```
$ npm install --global @mole-inc/mozjpeg
```

```
$ mozjpeg --help
```


## License

This is a fork of [imagemin/mozjpeg-bin](https://github.com/imagemin/mozjpeg-bin) licensed under the MIT License.

see LICENSE file and vendor/mozjpeg-license.txt file.
