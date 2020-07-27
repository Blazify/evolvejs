import { OPCODE } from '../Constants/OpCodes';

export interface IAPIParams {
	endpoint: string;
	method: 'GET' | 'POST' | 'DELETE' | 'PUT';
	content?: string;
}

export interface Payload {
	op: OPCODE;
	t?: string;
	s?: number;
	d?: any;
}
