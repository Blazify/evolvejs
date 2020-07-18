import User from './User';
import { CHANNELTYPES } from '../Constants/Constants';
import Guild from './Guild';
import Overwrite from './Overwrite';
export default class {
    id: string;
    type: CHANNELTYPES;
    guild: Guild;
    position: number;
    permissionOverwrites: Array<Overwrite>;
    name: string;
    topic: string;
    nsfw: boolean;
    bitrate: number;
    userLimit: number;
    rateLimitPerUser: number;
    recipients: Array<User>;
    icon: string;
    ownerID: string;
    applicationID: string;
    parentID: string;
    lastpinTimestamp: number;
    constructor(id: string, type: CHANNELTYPES, guild: Guild, position: number, permissionOverwrites: Array<Overwrite>, name: string, topic: string, nsfw: boolean, bitrate: number, userLimit: number, rateLimitPerUser: number, recipients: Array<User>, icon: string, ownerID: string, applicationID: string, parentID: string, lastpinTimestamp: number);
}
