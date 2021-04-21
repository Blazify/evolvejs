import { IGuildMember } from "./GuildMemberOptions.ts";

export interface IVoiceState {
 guild_id?: string; // The guild ID this voice state is for
 channel_id: string | null; // The channel ID this user is connected to
 user_id: string; // The user ID this voice state is for
 member?: IGuildMember; // The guild member this voice state is for
 session_id: string; // The session ID for this voice state
 deaf: boolean; // Whether this user is deafened by the server
 mute: boolean; // Whether this user is muted by the server
 self_deaf: boolean; // Whether this user is locally deafened
 self_mute: boolean; // Whether this user is locally muted
 self_stream?: boolean; // Whether this user is streaming using "Go Live"
 self_video: boolean; // Whether this user's camera is enabled
 suppress: boolean; // Whether this user is muted by the current user
}
