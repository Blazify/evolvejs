import Channel from './Channel';
import { IDMChannel } from '../../Interfaces/DMChannelOptions';
import { Snowflake, CHANNELTYPES } from '../../Constants/Constants';
import { Client } from '../../Client/Client';
import {User} from '../User/User';
import { Objex } from '@evolvejs/objex';

export default class extends Channel {
	public recipients: Objex<Snowflake, User> = new Objex();

	public lastMessage?: Snowflake;
	public lastPin?: number;

	constructor(data: IDMChannel, client: Client) {
		super(data.id, CHANNELTYPES.Direct, client);
		this.lastMessage = data.last_message_id || undefined;
		this.lastPin = data.last_pin_timestamp;
	}
}
