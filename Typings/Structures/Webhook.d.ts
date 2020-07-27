import { Snowflake } from '../Constants/Constants';
import Guild from './Guild';
import Channel from './Channel';
import User from './User';
export default class {
    id: Snowflake;
    type: number;
    guild: Guild;
    channel: Channel;
    user: User;
    name: string;
    avatar: string;
    token: string;
    constructor(id: Snowflake, type: number, guild: Guild, channel: Channel, user: User, name: string, avatar: string, token: string);
}
