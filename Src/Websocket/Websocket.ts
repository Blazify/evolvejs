import ws from 'ws';
import { EvolveClient } from '../Client/EvolveClient';
import { Gateway } from './Gateway';
import { CONSTANTS } from '../Constants/Constants';
import { EvolveBuilder } from '../Client/EvolveBuilder';
import { EvolveLogger } from '../Client/EvolveLogger';


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
				EvolveLogger.error(`Code: ${code}, Response: ${res}`)
			});

			this.on('message', (data) => {
				return new Gateway(data, this)
			});
			this.onclose = function(err) {
				EvolveLogger.error(err.reason)
			};
		} catch (e) {
			throw Error(e);
		}
	}
}
