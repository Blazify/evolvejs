
import { Payload } from "../../../Interfaces/Interfaces";
import { EvolveClient, EVENTS } from "../../..";
import { User } from "../../../Structures/User/User";

export default class {
	constructor(client: EvolveClient, payload: Payload) {
		client.emit(EVENTS.USER_UPDATE, new User(payload.d));
	}
}
