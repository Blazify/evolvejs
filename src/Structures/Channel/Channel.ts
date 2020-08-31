import { EvolveClient, CHANNELTYPES } from "../..";

export class Channel {
	public client: EvolveClient;
	public id: string;
	public type: CHANNELTYPES;

	constructor(id: string, type: CHANNELTYPES, client: EvolveClient) {
		this.client = client;
		this.id = id;
		this.type = type;
	}
}
