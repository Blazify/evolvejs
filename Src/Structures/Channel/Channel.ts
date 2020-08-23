import { CHANNELTYPES, Snowflake } from '../../Constants/Constants';
import { EvolveClient } from '../../Client/EvolveClient';

export default class {
	public client: EvolveClient;
	public id: string;
	public type: CHANNELTYPES;

	constructor(id: Snowflake, type: CHANNELTYPES, client: EvolveClient) {
		this.client = client;
		this.id = id;
		this.type = type;
	}
}
