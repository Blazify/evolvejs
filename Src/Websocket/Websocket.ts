import ws from 'ws';
import { Client } from '../Client/Client';
import { Gateway } from './Gateway';
import { CONSTANTS } from '../Constants/Constants';
import { EvolveErr } from '../Client/Error';

export class EvolveSocket extends ws {
	public seq?: number;

	constructor(public client: Client) {
		super(CONSTANTS.Gateway);
		this.client = client;
	}

	init() {
		try {
			this.on('error', (err) => {
				throw new EvolveErr('WSError', err.message);
			});

			this.on('close', (code, res) => {
				throw new EvolveErr('WSClose', code, res);
			});

			this.on('message', (data) => {
				console.log(JSON.parse(data.toString()));
				return Gateway(data, this.client, this);
			});
			this.socket.onclose = function() {
				throw new EvolveErr('TOKEN_ERROR')
			};
		} catch (e) {
			throw new EvolveErr('UNKOWN', e.message);
		}
	}
}
