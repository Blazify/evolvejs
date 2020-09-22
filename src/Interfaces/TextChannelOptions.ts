import { CHANNELTYPES } from "../mod.ts";
import { IOverwrite } from "./OverwriteOptions.ts";

export interface ITextChannel {
  id: string; // The ID of this channel
  type: CHANNELTYPES.Text; // The type of channel
  guild_id: string; // The ID of the guild
  position: number; // Sorting position of the channel
  permission_overwrites: IOverwrite[]; // Explicit permission overwrites for members and roles
  name: string; // The name of the channel
  topic?: string | null; // The channel topic
  nsfw: boolean; // wWhether the channel is nsfw
  last_message_id?: string | null; // The id of the last message sent in this channel
  rate_limit_per_user: number; // Amount of seconds a user has to wait before sending another message (0-21600)
  parent_id?: string | null; // ID of the parent category for a channel
  last_pin_timestamp?: number; // Timestamp when the last pinned message was pinned
}
