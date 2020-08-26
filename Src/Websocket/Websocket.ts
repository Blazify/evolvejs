import ws from 'ws';
import { EvolveClient } from '../Client/EvolveClient';
import { Gateway } from './Gateway';
import { CONSTANTS } from '../Constants/Constants';
import { EvolveBuilder } from '../Client/EvolveBuilder';


export class EvolveSocket extends ws {
	public seq?: number;

	constructor(
		public client: EvolveClient,
		public builder: EvolveBuilder,
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
				for(let i = 1; i < this.builder.shards; i++) {
				return new Gateway(data, this, [i-1, this.builder.shards]);
				}
			});
			this.onclose = function() {
				throw Error('TOKEN_ERROR')
			};
		} catch (e) {
			throw Error(e);
		}
	}
}
