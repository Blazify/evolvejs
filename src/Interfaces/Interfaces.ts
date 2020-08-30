/* eslint-disable @typescript-eslint/no-explicit-any */
import { OPCODE } from "..";

export interface IAPIParams {
	endpoint: string;
	method: "GET" | "POST" | "DELETE" | "PUT";
	content?: string;
}

export interface Payload {
	op: OPCODE;
	t?: string;
	s?: number;
	d?: any;
}
