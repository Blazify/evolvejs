import { Payload } from '../Interfaces/Interfaces';
import { OPCODE } from './OpCodes';
import { ActivityTypes } from './ActivityTypes';

export const Heartbeat: Payload = {
	op: OPCODE.Heartbeat,
	d: null
};

export const Identify: Payload = {
	op: OPCODE.Identify,
	d: {
		token: '',
		intents: 0,
		shard: [0, 1],
		properties: {
			$os: process.platform,
			$browser: 'discord',
			$device: 'evolvejs'
		},
		presence: {
			since: Date.now(),
			game: {
				name: "EvolveJS",
				type: ActivityTypes.PLAYING
			},
			status: "",
			afk: false
		}
	}
};
