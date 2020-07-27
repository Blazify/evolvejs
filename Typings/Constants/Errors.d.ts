import { Objex } from '@evolvejs/objex';
declare type codes = 'TOKEN_ERROR' | 'APIError' | 'WSError' | 'WSClose' | 'UNKOWN';
declare const Errors: Objex<string, string | Function>;
export { Errors, codes };
