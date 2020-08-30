import { CHANNELTYPES } from "..";
import { IOverwrite } from "./OverwriteOptions";

export interface ICategoryChannel {
	id: string; // The ID of this channel
	type: CHANNELTYPES.Category; // The type of channel
	guild_id: string; // The ID of the guild
	position: number; // Sorting position of the channel
	permission_overwrites: IOverwrite[]; // Explicit permission overwrites for members and roles
	name: string; // The name of the channel
}
