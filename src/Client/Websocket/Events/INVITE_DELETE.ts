
import { Payload } from "../../../Interfaces/Interfaces";
import { EvolveClient, EVENTS } from "../../..";
import Invite from "../../../Structures/Guild/Invite";

export default class {
	constructor(client: EvolveClient, payload: Payload) {
		const invite = new Invite(payload.d, client);
		client.emit(EVENTS.INVITE_DELETE, invite);
	}
}
