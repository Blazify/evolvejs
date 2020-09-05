import { CHANNELTYPES } from "..";
import { IUser } from "./UserOptions";

export interface IGroupChannel {
  id: string; // The ID of this channel
  type: CHANNELTYPES.Group; // The type of channel
  name?: string; // The name of the channel
  last_message_id?: string | null; // The id of the last message sent in this channel
  recipients: IUser[]; // The recipients of the DM
  icon?: string | null; // Icon hash
  owner_id: string; // ID of the DM creator
  application_id?: string; // Application id of the group DM creator if it is bot-created
  last_pin_timestamp?: number; // Timestamp when the last pinned message was pinned
}
