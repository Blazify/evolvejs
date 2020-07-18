import { Client } from "..";
import { Payload } from "../Interfaces/Payload"

export default class {
	constructor(client: Client, payload: Payload) {
		client.emit('MemberVCleave', payload.d);
	}
}
