import { Snowflake, Visibility } from '../Constants/Constants';
import { IActivity } from './ActivityOptions';

export interface IPresenceUpdate {
	user: any; // The user presence is being updated for
	roles: Snowflake[]; // Roles this user is in
	game: IActivity[] | null; // The user's current activity
	guild_id: Snowflake; // ID of the guild
	status: Visibility; // The visibility status
	activities: []; // User's current activities
	client_status: IClientStatus; // User's platform-dependent status
	premium_since?: number | null; //	When the user started boosting the guild
	nick?: string | null; // Guild nickname
}

export interface IClientStatus {
	desktop?: Visibility; // Desktop platform status
	mobile?: Visibility; // Mobile platform status
	web?: Visibility; // Web browser status
}
