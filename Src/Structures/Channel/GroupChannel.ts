import Channel from './Channel';
import { IGroupChannel } from '../../Interfaces/GroupChannelOptions';
import { Snowflake, CHANNELTYPES } from '../../Constants/Constants';
import User from '../User/User';
import { Client } from '../../Client/Client';
import { Objex } from '@evolvejs/objex';

export default class extends Channel {
	public recipients: Objex<Snowflake, User> = new Objex();

	public name?: string;
	public lastMessage?: Snowflake;
	public icon?: string;
	public owner?: User;
	public applicationID?: Snowflake;
	public lastPin?: number;

	constructor(data: IGroupChannel, client: Client) {
		super(data.id, CHANNELTYPES.Group, client);

		this.setCache(data);
		(async (data: IGroupChannel) => {
			const user = await this.client.getUser(data.owner_id);
			this.owner = new User(user);
		})(data);

		this.name = data.name;
		this.lastMessage = data.last_message_id || undefined;
		this.icon = data.icon || undefined;
		this.applicationID = data.application_id;
		this.lastPin = data.last_pin_timestamp;
	}

	private setCache(data: IGroupChannel) {
		for (let raw of data.recipients) this.recipients.set(raw.id, new User(raw));
	}
}
