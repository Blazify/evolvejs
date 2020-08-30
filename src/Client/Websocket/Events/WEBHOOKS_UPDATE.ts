
import { Payload } from "../../../Interfaces/Interfaces";
import { EvolveClient, EVENTS } from "../../..";

export default class {
	constructor(client: EvolveClient, payload: Payload) {
		client.emit(EVENTS.WEBHOOKS_UPDATE, (payload.d));
	}
}
