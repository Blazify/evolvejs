import { Snowflake } from '../Constants/Constants';
import Channel from './Channel';
import Guild from './Guild';
import Overwrite from './Overwrite';
export default class extends Channel {
    guild: Guild;
    name: string;
    permissionOverwrites: Array<Overwrite>;
    position: number;
    parentID: string;
    topic: string;
    nsfw: boolean;
    rateLimitPerUser: number;
    lastpinTimestamp: number;
    constructor(id: Snowflake, guild: Guild, name: string, permissionOverwrites: Array<Overwrite>, position: number, parentID: string, topic: string, nsfw: boolean, rateLimitPerUser: number, lastpinTimestamp: number);
}
