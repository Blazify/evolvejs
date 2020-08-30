
import { Payload } from "../../../Interfaces/Interfaces";
import { EvolveClient, EVENTS } from "../../..";

export default class {
	constructor(client: EvolveClient, payload: Payload) {
		client.emit(EVENTS.VOICE_STATE_UPDATE, (payload.d));
	}
}
