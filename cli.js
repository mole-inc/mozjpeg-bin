#!/usr/bin/env node
import {spawn} from 'node:child_process';
import mozjpeg from './lib/index.js';

const input = process.argv.slice(2);

spawn(mozjpeg, input, {stdio: 'inherit'})
	.on('exit', process.exit);
