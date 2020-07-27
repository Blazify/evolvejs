import { Snowflake, Visibility } from '../Constants/Constants';
import { IActivity } from './ActivityOptions';
import { IClientStatus } from './ClientStatusOptions';
export interface IPresenceUpdate {
    user: any;
    roles: Snowflake[];
    game: IActivity[] | null;
    guild_id: Snowflake;
    status: Visibility;
    activities: [];
    client_status: IClientStatus;
    premium_since?: number | null;
    nick?: string | null;
}
