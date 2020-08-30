/* eslint-disable @typescript-eslint/no-explicit-any */
import { OPCODE } from "..";
import { MessageEmbed } from "../Utils/Embed/MessageEmbed";

export interface IAPIParams {
	endpoint: string;
	method: "GET" | "POST" | "DELETE" | "PUT";
	content?: string | MessageEmbed;
}

export interface Payload {
	op: OPCODE;
	t?: string;
	s?: number;
	d?: any;
}
