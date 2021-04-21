export interface IRole {
 id: string; // Role ID
 name: string; // Role name
 color: number; // Integer representation of hexadecimal color code
 hoist: boolean; // Whether the role is separately hoisted
 position: number; // Position of this role
 permissions: number; // Permission bit set
 managed: boolean; // Whether this role is managed by an integration
 mentionable: boolean; // Whether this role is mentionable
}
