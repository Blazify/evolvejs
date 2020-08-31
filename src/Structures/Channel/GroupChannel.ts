import { Channel, User, IGroupChannel, EvolveClient, CHANNELTYPES } from "../..";
import { Objex } from "@evolvejs/objex";

export class GroupChannel extends Channel {
	public recipients: Objex<string, User> = new Objex();

	public name?: string;
	public lastMessage?: string;
	public icon?: string;
	public owner?: User;
	public applicationID?: string;
	public lastPin?: number;

	constructor(data: IGroupChannel, client: EvolveClient) {
		super(data.id, CHANNELTYPES.Group, client);
		(async (data: IGroupChannel) => {
			this.owner = await this.client.api.getUser(data.owner_id);
		})(data);

		this.name = data.name;
		this.lastMessage = data.last_message_id || undefined;
		this.icon = data.icon || undefined;
		this.applicationID = data.application_id;
		this.lastPin = data.last_pin_timestamp;
	}
}
