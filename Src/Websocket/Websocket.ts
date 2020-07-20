import ws from 'ws';
import { Client } from '../Client/Client';
import { Gateway } from './Gateway';
import { CONSTANTS } from '../Constants/Constants';
import { EvolveErr } from '../Client/Error';

export class Websocket {
	public socket: ws = new ws(CONSTANTS.GATEWAY);

	constructor(public client: Client) {
		this.client = client;
	}

	init(token: string) {
		try {
			this.socket.on('message', (data) => {
				return Gateway(data, this.client, token, this.socket);
			});
			this.socket.onclose = function() {
				throw new EvolveErr('TOKEN_ERROR')
			};
		} catch (e) {
			throw new Error(e);
		}
	}
}
