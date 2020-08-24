import ws from 'ws';
import { EvolveClient } from '../Client/EvolveClient';
import { Gateway } from './Gateway';
import { CONSTANTS } from '../Constants/Constants';


export class EvolveSocket extends ws {
	public seq?: number;

	constructor(public client: EvolveClient, public intents: number) {
		super(CONSTANTS.Gateway);
		this.client = client;
	}

	init() {
		try {
			this.on('error', (err) => {
				throw Error(err.toString());
			});

			this.on('close', (code, res) => {
				throw Error(code + res);
			});

			this.on('message', (data) => {
				return Gateway(data, this.client, this);
			});
			this.onclose = function() {
				throw Error('TOKEN_ERROR')
			};
		} catch (e) {
			throw Error(e);
		}
	}
}
