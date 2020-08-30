import { WEBHOOKTYPE } from "..";
import { IUser } from "./UserOptions";

export interface IWebhook {
	id: string; // The ID of the webhook
	type: WEBHOOKTYPE; // The type of the webhook
	guild_id?: string; // The guild ID this webhook is for
	channel_id: string; // The channel ID this webhook is for
	user?: IUser; // The user this webhook was created by
	name: string | null; // The default name of the webhook
	avatar: string | null; // The default avatar of the webhook
	token?: string; // The secure token of the webhook (returned for Incoming Webhooks)
}
