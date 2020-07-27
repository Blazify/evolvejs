import { Snowflake } from '../Constants/Constants';

export interface IOverwrite {
	id: Snowflake; // Role or user ID
	type: 'role' | 'member'; // Either "role" or "member"
	allow: number; // Permission bit set
	deny: number; // Permission bit set
}
