import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {BinWrapper} from '@mole-inc/bin-wrapper';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const url = 'https://raw.githubusercontent.com/mole-inc/mozjpeg-bin/v7.1.2/vendor/';

const bin = new BinWrapper()
	.src(`${url}macos/cjpeg`, 'darwin')
	.src(`${url}linux/cjpeg`, 'linux')
	.src(`${url}win/x86/cjpeg.exe`, 'win32', 'x86')
	.src(`${url}win/x64/cjpeg.exe`, 'win32', 'x64')
	.dest(path.join(__dirname, '../vendor'))
	.use(process.platform === 'win32' ? 'cjpeg.exe' : 'cjpeg')
	.version('>=3.0');

export {bin};
export default bin.path;
