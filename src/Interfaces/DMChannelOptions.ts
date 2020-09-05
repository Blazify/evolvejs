import { CHANNELTYPES } from "..";
import { IUser } from "./UserOptions";

export interface IDMChannel {
  id: string; // The ID of this channel
  type: CHANNELTYPES.Direct; // The type of channel
  last_message_id?: string | null; // The id of the last message sent in this channel
  recipients: IUser[]; // The recipients of the DM
  last_pin_timestamp?: number; // Timestamp of the last pinned message
}
