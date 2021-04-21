export interface IOverwrite {
 id: string; // Role or user ID
 type: "role" | "member"; // Either "role" or "member"
 allow: number; // Permission bit set
 deny: number; // Permission bit set
}
