
import { Payload } from "../../../Interfaces/Interfaces";
import { EvolveClient, EVENTS } from "../../..";
import PresenceUpdate from "../../../Structures/User/PresenceUpdate";

export default class {
	constructor(client: EvolveClient, payload: Payload) {
		const presence = new PresenceUpdate(payload.d, client);
		client.emitEvent(EVENTS.PRESENCE_UPDATE, presence);
	}
}
