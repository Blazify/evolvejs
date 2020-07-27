import { CHANNELTYPES, Snowflake } from '../../Constants/Constants';
import { Client } from '../../Client/Client';

export default class {
	public client: Client;
	public id: string;
	public type: CHANNELTYPES;

	constructor(id: Snowflake, type: CHANNELTYPES, client: Client) {
		this.client = client;
		this.id = id;
		this.type = type;
	}
}
