import { Snowflake, CHANNELTYPES } from '../Constants/Constants';
export interface ICategoryChannel {
    id: Snowflake;
    type: CHANNELTYPES.CATEGORY;
    guild_id: Snowflake;
    position: number;
    permission_overwrites: [];
    name: string;
}
