import { Errors, codes } from '../Constants/Errors';
import chalk from 'chalk';
const symCode = Symbol('code');

function newError(Type: any) {
	return class EvolveError extends Type {
		public [symCode]: string;

		constructor(code: codes, ...params: any[]) {
			super(createMsg(code, params));
			this[symCode] = code;
			if (Error.captureStackTrace) Error.captureStackTrace(this, EvolveError);
		}

		public get name() {
			return `${chalk.hex('#247BA0')('EvolveError')} [${chalk.grey(
				this[symCode]
			)}]`;
		}

		public get code() {
			return this[symCode];
		}
	};
}

function createMsg(name: string, params: any[]) {
	let message = Errors.get(name);
	if (!message) throw new Error(`No error found with name: ${name}.`);
	if (typeof message === 'function') message = message(...params);
	return chalk.red(message);
}

const EvolveErr = newError(Error);
const TypeErr = newError(TypeError);
const RangeErr = newError(RangeError);

export { EvolveErr, TypeErr, RangeErr };
