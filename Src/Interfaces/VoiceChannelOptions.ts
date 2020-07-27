import { Snowflake, CHANNELTYPES } from '../Constants/Constants';
import { IOverwrite } from './OverwriteOptions';

export interface IVoiceChannel {
	id: Snowflake; // The ID of this channel
	type: CHANNELTYPES.Voice; // The type of channel
	guild_id: Snowflake; // The ID of the guild
	position: number; // Sorting position of the channel
	permission_overwrites: IOverwrite[]; // Explicit permission overwrites for members and roles
	name: string; // The name of the channel
	bitrate: number; // The bitrate (in bits) of the voice channel
	user_limit: number; // The user limit of the voice channel
	parent_id?: Snowflake | null; // ID of the parent category for a channel
}
