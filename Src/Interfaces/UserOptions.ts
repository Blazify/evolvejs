import { Snowflake } from '../Constants/Constants';

export interface IUser {
	id: Snowflake; // The user's id identify
	username: string; // The user's username, not unique across the platform identify
	discriminator: string; // The user's 4-digit discord-tag identify
	avatar: string | null; // The user's avatar hash identify
	bot?: boolean; // Whether the user belongs to an OAuth2 application identify
	system?: boolean; // Whether the user is an Official Discord System user (part of the urgent message system) identify
	mfa_enabled?: boolean; // Whether the user has two factor enabled on their account identify
	locale?: string; // The user's chosen language option identify
	verified?: boolean; // Whether the email on this account has been verified email
	email?: string | null; // The user's email email
	flags?: number; // The flags on a user's account identify
	premium_type?: 0 | 1 | 2; // The type of Nitro subscription on a user's account identify
	public_flags?: number; // The public flags on a user's account
}
