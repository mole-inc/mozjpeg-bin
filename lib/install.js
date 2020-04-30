'use strict';
const os = require('os');
const fs = require('fs');
const path = require('path');
const binBuild = require('bin-build');
const log = require('logalot');
const which = require('which');
const binVersionCheck = require('bin-version-check');
const {promisify} = require('util');

const bin = require('.');

const install = async () => {
	const jobs = os.cpus().length;

	try {
		await bin.run(['-version']);
		log.success('mozjpeg pre-build test passed successfully');
	} catch (error) {
		log.warn(error.message);
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

		try {
			await binBuild.url('https://github.com/mozilla/mozjpeg/archive/v3.3.1.tar.gz', [
				'autoreconf -fiv',
				cfg,
				`make -j${jobs}`,
				`make install -j${jobs}`
			]);
			log.success('mozjpeg built successfully');
		} catch (error) {
			log.error(error.stack);
			throw error;
		}
	}
};

(async () => {
	try {
		const use = process.platform === 'win32' ? 'cjpeg.exe' : 'cjpeg';
		const systemBin = await which(use).catch(error => {
			throw error;
		});
		const version = '>=3.0';
		await binVersionCheck(systemBin, version, {args: ['-version']}).catch(error => {
			log.warn(`The \`${systemBin}\` binary doesn't seem to work correctly or doesn't satisfy version \`${version}\``);
			throw error;
		});
		const vendor = path.join(__dirname, '../vendor');
		await promisify(fs.mkdir)(vendor).catch(error => {
			if (error.code === 'EEXIST') {
				return;
			}

			log.warn(error.message);
			throw error;
		});
		const target = path.join(vendor, use);
		await promisify(fs.symlink)(systemBin, target).catch(error => {
			if (error.code === 'EEXIST') {
				return;
			}

			log.warn(error.message);
			throw error;
		});
		log.success(`create cjpeg symlink \`${target}\``);
	} catch {
		await install().catch(() => {
			// eslint-disable-next-line unicorn/no-process-exit
			process.exit(1);
		});
	}
})();
