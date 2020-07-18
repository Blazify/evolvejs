import { OPCODE } from '../Constants/OpCodes';
import { Payload } from '../Interfaces/Payload';
import { Heartbeat, Identify } from '../Constants/Payloads';
import { Client } from '../Client/Client';
import WebSocket from 'ws';
import { EvolveErr } from '../Client/Error';
import { handler } from '../Events/BOT_ADD';

export function Gateway(
	data: any,
	client: Client,
	token: string,
	ws: WebSocket
) {
	try {
		let payload: Payload = JSON.parse(data);

		const { op, t, s, d } = payload;
		if (!d) return;

		if (op === OPCODE.Hello) {
			Identify.d.token = token;

			setInterval(() => {
				ws.send(JSON.stringify(Heartbeat));
			}, d.heartbeat_interval);

			ws.send(JSON.stringify(Identify));
		}
		else if (t) {
			try {
				if(t !== "READY") {
				const { default: handler } = require(`../Events/${t}`);
				new handler(client, payload);
				} else if(t === "READY") {
					const { default: module } = require(`../Events/${t}`)
				module(client, payload)	
				}
			} catch (e) {
				console.log(e);
			}
		}
	} catch (e) {
		throw new Error(e);
	}
}
