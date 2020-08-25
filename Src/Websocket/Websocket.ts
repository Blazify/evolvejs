import ws from 'ws';
import { EvolveClient } from '../Client/EvolveClient';
import { Gateway } from './Gateway';
import { CONSTANTS } from '../Constants/Constants';
import { Identify } from '../Constants/Payloads';
import { EvolveBuilder } from '../Client/EvolveBuilder';


export class EvolveSocket extends ws {
	public seq?: number;

	constructor(
		public client: EvolveClient,
		public builder: EvolveBuilder,
		public shards: Array<Number>
		) {
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
				return Gateway(data, this);
			});
			this.onclose = function() {
				throw Error('TOKEN_ERROR')
			};
		} catch (e) {
			throw Error(e);
		}
	}
}
