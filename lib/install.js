'use strict';
const os = require('os');
const fs = require('fs');
const path = require('path');
const binBuild = require('bin-build');
const log = require('logalot');
const which = require('which');
const binVersionCheck = require('bin-version-check');
const is = require('@sindresorhus/is');
const {promisify} = require('util');

const bin = require('.');

const install = async () => {
	const jobs = os.cpus().length;

	const builder = await bin.run(['-version']).catch(error => {
		log.warn(error.message);
		if (process.platform === 'win32') {
			log.error('mozjpeg pre-build test failed');
			throw new Error('compiling doesn\'t support win32');
		}

		log.warn('mozjpeg pre-build test failed');
		log.info('compiling from source');

		let cfgExtras = '';
		if (process.platform === 'darwin') {
			cfgExtras = 'libpng_LIBS=\'/usr/local/lib/libpng16.a -lz\' --enable-static';
		}

		const cfg = [
			`./configure --enable-static --disable-shared --disable-dependency-tracking --with-jpeg8 ${cfgExtras}`,
			`--prefix="${bin.dest()}" --bindir="${bin.dest()}" --libdir="${bin.dest()}"`
		].join(' ');

		return binBuild.url('https://github.com/mozilla/mozjpeg/archive/v3.3.1.tar.gz', [
			'autoreconf -fiv',
			cfg,
			`make -j${jobs}`,
			`make install -j${jobs}`
		]);
	});
	if (builder && is.nativePromise(builder)) {
		await builder().catch(error => {
			log.error(error.stack);
			throw error;
		});
		log.success('mozjpeg built successfully');
	}

	log.success('mozjpeg pre-build test passed successfully');
};

(async () => {
	const use = process.platform === 'win32' ? 'cjpeg.exe' : 'cjpeg';
	const systemBin = await which(use).catch(error => {
		throw error;
	});
	const version = '>=3.0';
	await binVersionCheck(systemBin, version, {args: ['-version']}).catch(error => {
		log.warn(`The \`${systemBin}\` binary doesn't seem to work correctly or doesn't satisfy version \`${version}\``);
		throw error;
	});
	const target = path.join(__dirname, '../vendor', use);
	await promisify(fs.symlink)(systemBin, target).catch(error => {
		if (error.code === 'EEXIST') {
			return;
		}

		log.warn(error.message);
		throw error;
	});
	log.success(`create cjpeg symlink \`${target}\``);
})().catch(() => {
	install().catch(() => {});
});
