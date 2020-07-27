import { Objex } from '@evolvejs/objex';

type codes = 'TOKEN_ERROR' | 'APIError' | 'WSError' | 'WSClose' | 'UNKOWN';

const raw = {
	TOKEN_ERROR: 'You have provided an invalid token.',
	APIError: (e: string) => e,
	WSError: (e: string) => e,
	WSClose: (code: number, reason: string) => `[Code: ${code}] ${reason}`,
	UNKOWN: (e: string) => e
};

const Errors = new Objex<string, string | Function>();
for (const [ name, msg ] of Object.entries(raw)) Errors.set(name, msg);

export { Errors, codes };
