import {IUser} from "./UserOptions";

enum expire_behavior {
    Remove_role,
    Kick
}
interface IGuildIntegrationAccount {
    id: string;
    name: string;
}
export interface ICreateGuildIntegration {
    id: any;
    type: string;
}
export interface IGuildIntegration {
    id: string;
    name: string;
    type: string;
    enabled: boolean;
    syncing: boolean;
    role_id: string;
    enable_emoticons?: boolean;
    expire_behavior: expire_behavior;
    expire_grace_period: number;
    user: IUser;
    account: IGuildIntegrationAccount;
    synced_at: any;
}