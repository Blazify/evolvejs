import { Objex } from '@evolvejs/objex';

type codes = 'TOKEN_ERROR' | 'UNKOWN';

const raw = {
	TOKEN_ERROR: 'You have provided an invalid token.',
	UNKOWN: (e: string) => e
};

const Errors = new Objex<string, string | Function>();
for (const [ name, msg ] of Object.entries(raw)) Errors.set(name, msg);

export { Errors, codes };
