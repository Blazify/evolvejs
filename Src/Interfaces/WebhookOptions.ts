import { Snowflake, WEBHOOKTYPE } from '../Constants/Constants';
import { IUser } from './UserOptions';

export interface IWebhook {
	id: Snowflake; // The ID of the webhook
	type: WEBHOOKTYPE; // The type of the webhook
	guild_id?: Snowflake; // The guild ID this webhook is for
	channel_id: Snowflake; // The channel ID this webhook is for
	user?: IUser; // The user this webhook was created by
	name: string | null; // The default name of the webhook
	avatar: string | null; // The default avatar of the webhook
	token?: string; // The secure token of the webhook (returned for Incoming Webhooks)
}
