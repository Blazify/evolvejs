import { OPCODE } from '../Constants/OpCodes';
import { Payload } from '../Interfaces/Payload';
import { Heartbeat, Identify } from '../Constants/Payloads';
import { Client } from '../Client/Client';
import WebSocket from 'ws';
import { EvolveErr } from '../Client/Error';

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
				const { handler } = require(`../Events/${t}`);
				handler(client, payload);
			} catch (e) {
				throw new EvolveErr('UNKOWN', e.message);
			}
		}
	} catch (e) {
		throw new EvolveErr('UNKOWN', e.message);
	}
}
