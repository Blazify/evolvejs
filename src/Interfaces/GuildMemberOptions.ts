import { User } from "../Structures/User/User";

export interface IGuildMember {
	user?: User; // The member's user object
	nick: string | null; // This users guild nickname
	roles: string[]; // Array of role IDs
	joined_at: number; // Timestamp	when the user joined the guild
	premium_since?: number | null; // Timestamp when the user started boosting the guild
	deaf: boolean; // Whether the user is deafened in voice channels
	mute: boolean; // Whether the user is muted in voice channels
}
