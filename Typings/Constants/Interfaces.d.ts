import { OPCODE } from './OpCodes';
import { Snowflake, CHANNELTYPES } from './Constants';
export interface IAPIParams {
    endpoint: string;
    method: 'GET' | 'POST' | 'DELETE' | 'PUT';
    content?: string;
}
export interface Payload {
    op: OPCODE;
    t?: string;
    s?: number;
    d?: any;
}
export interface IGuildOptions {
    id: Snowflake;
    name: string;
    icon: string;
    splash: string | null;
    discovery_splash: string | null;
    owner?: boolean;
    owner_id: Snowflake;
    permissions?: number;
    region: string;
    afk_channel_id: Snowflake | null;
    afk_timeout: number;
    verification_level: number;
    default_message_notifications: number;
    explicit_content_filter: number;
    roles: [];
    emojis: [];
    features: string[];
    mfa_level: number;
    application_id: Snowflake | null;
    widget_enabled?: boolean;
    widget_channel_id?: Snowflake | null;
    system_channel_id?: Snowflake | null;
    system_channel_flags: number;
    rules_channel_id?: Snowflake | null;
    joined_at?: number;
    large?: boolean;
    unavailable?: boolean;
    member_count?: number;
    voice_states?: [];
    members?: [];
    channels?: IChannelOptions[];
    presences?: [];
    max_presences?: number | null;
    max_members?: number;
    vanity_url_code: string | null;
    description: string | null;
    banner: string | null;
    premium_tier: number;
    premium_subscription_count?: number;
    preferred_locale: string;
    public_updates_channel_id?: Snowflake;
    max_video_channel_users?: number;
    approximate_member_count?: number;
    approximate_presence_count?: number;
}
export interface IChannelOptions {
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
