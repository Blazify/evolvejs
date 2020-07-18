import { Client, Payload } from '..';


export default class {
	constructor(client: Client, payload: Payload) {
		let { d } = payload
		
		client.emit('guildCreate', (client.guilds));
	}
}
