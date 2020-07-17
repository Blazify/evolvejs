import { Payload } from '../Interfaces/Payload';
import { OPCODE } from './OpCodes';

export const Heartbeat: Payload = {
	op: OPCODE.Heartbeat
};

export const Identify: Payload = {
	op: OPCODE.Identify,
	d: {
		token: '',
		properties: {
			$os: 'linux',
			$browser: 'EvolveJS_ts',
			$device: 'discord'
		}
	}
};
