# mozjpeg-bin [![Node CI](https://github.com/mole-inc/mozjpeg-bin/actions/workflows/nodejs.yml/badge.svg)](https://github.com/mole-inc/mozjpeg-bin/actions/workflows/nodejs.yml)

> [mozjpeg](https://github.com/mozilla/mozjpeg) is a production-quality JPEG encoder that improves compression while maintaining compatibility with the vast majority of deployed decoders

You probably want [`imagemin-mozjpeg`](https://github.com/mole-inc/imagemin-mozjpeg) instead.


[![Downloads](https://badgen.net/npm/dm/@mole-inc/mozjpeg)](https://www.npmjs.com/package/@mole-inc/mozjpeg)
[![Version](https://badgen.net/npm/v/@mole-inc/mozjpeg)](https://www.npmjs.com/package/@mole-inc/mozjpeg)
[![codecov](https://codecov.io/gh/mole-inc/mozjpeg-bin/branch/master/graph/badge.svg)](https://codecov.io/gh/mole-inc/mozjpeg-bin)


## Install

```
$ npm install @mole-inc/mozjpeg
```


## Usage

```js
import {execFile} from 'child_process';
import mozjpeg from '@mole-inc/mozjpeg';

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

see license file and vendor/mozjpeg-license.txt file.
