import { EvolveSocket } from './Websocket';
import { Client } from '../Client/Client';
import { OPCODE } from '../Constants/OpCodes';
import { Payload } from '../Interfaces/Interfaces';
import { Heartbeat, Identify } from '../Constants/Payloads';
import { EvolveErr } from '../Client/Error';

export function Gateway(data: any, client: Client, ws: EvolveSocket) {
	try {
		let payload: Payload = JSON.parse(data);
		const { op, t, s, d } = payload;
		if (d === null || d === undefined) return;

		if (op === OPCODE.Hello) {
			// Command: Heartbeat
			setInterval(() => {
				if (ws.seq) Heartbeat.d = ws.seq;
				ws.send(JSON.stringify(Heartbeat));
			}, d.heartbeat_interval);

			// Command: Identify
			Identify.d.token = client.token;
			ws.send(JSON.stringify(Identify));
		}
		else if (op === OPCODE.Reconnect) {
			//console.log(payload);
		}
		else if (op === OPCODE.Invalid) {
			//console.log(payload);
		}
		else if (t) {
			try {
					const { default: handler } = require(`../Events/${t}`);
					new handler(client, payload);
			} catch (e) {
				throw new EvolveErr('UNKOWN', e.message);
			}
		}
	} catch (e) {
		throw new EvolveErr('UNKOWN', e.message);
	}
}
