import { EvolveSocket } from './Websocket';
import { OPCODE } from '../Constants/OpCodes';
import { Payload } from '../Interfaces/Interfaces';
import { Heartbeat, Identify } from '../Constants/Payloads';


export function Gateway(data: any, ws: EvolveSocket) {
	try {
		let payload: Payload = JSON.parse(data);
		const { op, t, d } = payload;
		if (!d) return;

		if (op === OPCODE.Hello) {
			// Command: Heartbeat
			setInterval(() => {
				if (ws.seq) Heartbeat.d = ws.seq;
				ws.send(JSON.stringify(Heartbeat));
			}, d.heartbeat_interval);

			// Command: Identify
			Identify.d.token = ws.client.token 
			Identify.d.intents = ws.builder.intents
			Identify.d.shards = ws.shards

			if(ws.builder.activity) {
				Identify.d.activity = ws.builder.activity
			}
			ws.send(JSON.stringify(Identify));

			ws.client.emit("shardReady", (ws.shards))
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
					console.log(t)
					new handler(ws.client, payload, ws.shards);
			} catch (e) {
				throw Error(e);
			}
		}
	} catch (e) {
		throw Error(e);
	}
}
