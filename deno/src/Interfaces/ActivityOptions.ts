import { ACTIVITY } from "../mod.ts";

export interface IActivity {
 /**
 * The activity name
 */
 name: string;
 /**
 * The activity type
 */
 type: ACTIVITY;
 /**
 * Timestamp of when the activity was added to the user's session
 */
 created_at: number;
 /**
 * Stream url, is validated when type is 1
 */
 url?: string | null;
 /**
 * Timestamps for start and/or end of the game
 */
 timestamps?: ITimestamps;
 /**
 * Application id for the game
 */
 application_id?: string;
 /**
 * What the player is currently doing
 */
 details?: string | null;
 /**
 * The user's current party status
 */
 state?: string | null;
 /**
 * The emoji used for a custom status
 */
 emoji?: IActivityEmoji | null;
 /**
 * Information for the current party of the player
 */
 party?: IParty;
 /**
 * Images for the presence and their hover texts
 */
 assets?: IAssets;
 /**
 * Secrets for Rich Presence joining and spectating
 */
 secrets?: ISecrets;
 /**
 * Whether or not the activity is an instanced game session
 */
 instance?: boolean;
 /**
 * Activity flags ORd together, describes what the payload includes
 */
 flags?: number;
}

export interface ITimestamps {
 start?: number; // Activity start time in ms
 end?: number; // Activity end time in ms
}

export interface IActivityEmoji {
 /**
 * Emoji name
 */
 name: string;
 /**
 * Emoji ID
 */
 id?: string;
 /**
 * Whether the emoji is animated
 */
 animated?: boolean;
}

export interface IParty {
 /**
 * The id of the party
 */
 id?: string;
 /**
 * The party's current and maximum size
 */
 size?: [number, number];
}

export interface IAssets {
 /**
 * The ID for a large asset of the activity
 */
 large_image?: string;
 /**
 * Text displayed when hovering over the large image of the activity
 */
 large_text?: string;
 /**
 * The ID for a small asset of the activity
 */
 small_image?: string;
 /**
 * Text displayed when hovering over the small image of the activity
 */
 small_text?: string;
}

export interface ISecrets {
 /**
 * The secret for joining a party
 */
 join?: string;
 /**
 * The secret for spectating a game
 */
 spectate?: string;
 /**
 * The secret for a specific instanced match
 */
 match?: string;
}
