import { IRole } from "./RoleOptions.ts";
import { IUser } from "./UserOptions.ts";

export interface IEmoji {
  id: string | null; // ID of the emoji
  name: string | null; // Name of the emoji
  roles?: IRole[]; // Roles the emoji is available to
  user: IUser; // User who added the emoji
  require_colons?: boolean; // Whether it needs to be wrapped in colons
  managed?: boolean; // Whether it is managed
  animated?: boolean; // Whether the emoji is animated
  available?: boolean; // May be false due to loss of Server Boosts
}
