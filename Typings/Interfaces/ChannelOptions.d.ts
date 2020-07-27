import { CHANNELTYPES, Snowflake } from '../Constants/Constants';
export interface IChannel {
    id: Snowflake;
    type: CHANNELTYPES;
    guild_id?: Snowflake;
    position?: number;
    permission_overwrites?: [];
    name?: string;
    topic?: string | null;
    nsfw?: boolean;
    last_message_id?: Snowflake | null;
    bitrate?: number;
    user_limit?: number;
    rate_limit_per_user?: number;
    recipients?: [];
    icon?: string | null;
    owner_id?: Snowflake;
    application_id?: Snowflake;
    parent_id?: Snowflake | null;
    last_pin_timestamp?: number;
}
