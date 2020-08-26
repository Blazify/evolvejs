import { EvolveSocket } from './Websocket';
import { OPCODE } from '../Constants/OpCodes';
import { Payload } from '../Interfaces/Interfaces';
import { Heartbeat, Identify } from '../Constants/Payloads';
import { Data } from 'ws';


export class Gateway {
	constructor(
		data: Data, 
		ws: EvolveSocket, 
		shardArray: Array<number>
		) {
	try {
		let payload: Payload = JSON.parse(data.toString());
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
			Identify.d.shards = shardArray

			if(ws.builder.activity) {
				Identify.d.activity = ws.builder.activity
			}
			ws.send(JSON.stringify(Identify));

			ws.client.emit("shardReady", (shardArray))
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
					new handler(ws.client, payload, shardArray);
			} catch (e) {
				throw Error(e);
			}
		}
	} catch (e) {
		throw Error(e);
	}
}
}