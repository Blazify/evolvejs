import { CHANNELTYPES } from "..";
import { IOverwrite } from "./OverwriteOptions";

export interface IStoreChannel {
  id: string; // The ID of this channel
  type: CHANNELTYPES.Store; // The type of channel
  guild_id: string; // The ID of the guild
  position: number; // Sorting position of the channel
  permission_overwrites: IOverwrite[]; // Explicit permission overwrites for members and roles
  name: string; // The name of the channel
  nsfw: boolean; // wWhether the channel is nsfw
  rate_limit_per_user: number; // Amount of seconds a user has to wait before sending another message (0-21600)
  parent_id?: string | null; // ID of the parent category for a channel
}
