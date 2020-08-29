import Channel from './Channel';
import { IGroupChannel } from '../../Interfaces/GroupChannelOptions';
import { Snowflake, CHANNELTYPES } from '../../Constants/Constants';
import { User } from '../User/User';
import { EvolveClient } from '../../Client/EvolveClient';
import { Objex } from '@evolvejs/objex';

export default class extends Channel {
	public recipients: Objex<Snowflake, User> = new Objex();

	public name?: string;
	public lastMessage?: Snowflake;
	public icon?: string;
	public owner?: User;
	public applicationID?: Snowflake;
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
