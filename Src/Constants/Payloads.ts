import { Payload } from '../Interfaces/Interfaces';
import { OPCODE } from './OpCodes';

export const Heartbeat: Payload = {
	op: OPCODE.Heartbeat,
	d: null
};

export const Identify: Payload = {
	op: OPCODE.Identify,
	d: {
		token: '',
		properties: {
			$os: 'linux',
			$browser: 'evolvejs',
			$device: 'discord'
		}
	}
};
