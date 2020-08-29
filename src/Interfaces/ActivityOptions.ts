import { ACTIVITY } from '..';

export interface IActivity {
	name: string; // The activity name
	type: ACTIVITY; // The activity type
	created_at: number; // Timestamp of when the activity was added to the user's session
	url?: string | null; // Stream url, is validated when type is 1
	timestamps?: ITimestamps; // Timestamps for start and/or end of the game
	application_id?: string; // Application id for the game
	details?: string | null; // What the player is currently doing
	state?: string | null; // The user's current party status
	emoji?: IActivityEmoji | null; // The emoji used for a custom status
	party?: IParty; // Information for the current party of the player
	assets?: IAssets; // Images for the presence and their hover texts
	secrets?: ISecrets; // Secrets for Rich Presence joining and spectating
	instance?: boolean; // Whether or not the activity is an instanced game session
	flags?: number; // Activity flags ORd together, describes what the payload includes
}

export interface ITimestamps {
	start?: number; // Activity start time in ms
	end?: number; // Activity end time in ms
}

export interface IActivityEmoji {
	name: string; // Emoji name
	id?: string; // Emoji ID
	animated?: boolean; // Whether the emoji is animated
}

export interface IParty {
	id?: string; // The id of the party
	size?: [number, number]; // The party's current and maximum size
}

export interface IAssets {
	large_image?: string; // The ID for a large asset of the activity
	large_text?: string; // Text displayed when hovering over the large image of the activity
	small_image?: string; // The ID for a small asset of the activity
	small_text?: string; // Text displayed when hovering over the small image of the activity
}

export interface ISecrets {
	join?: string; // The secret for joining a party
	spectate?: string; // The secret for spectating a game
	match?: string; // The secret for a specific instanced match
}
