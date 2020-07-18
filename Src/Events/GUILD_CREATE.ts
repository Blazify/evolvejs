import { Client } from "..";
import { Payload } from "../Interfaces/Payload"


export default class {
	constructor(client: Client, payload: Payload) {
		let { d } = payload
		
		client.emit('guildCreate', (client.guilds));
	}
}
