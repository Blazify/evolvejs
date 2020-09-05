import { ChannelResolvable } from "..";
import { IGuild } from "./GuildOptions";
import { IUser } from "./UserOptions";

export interface IInvite {
  code: string; // The invite code (unique ID)
  guild?: IGuild; // The guild this invite is for
  channel: ChannelResolvable; // The channel this invite is for
  inviter?: IUser; // The user who created the invite
  target_user?: IUser; // The target user for this invite
  target_user_type?: number; // The type of user target for this invite
  approximate_presence_count?: number; // Approximate count of online members (only present when target_user is set)
  approximate_member_count?: number; // Approximate count of total members
}
