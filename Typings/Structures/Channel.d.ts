import User from './User';
import { CHANNELTYPES } from '../Constants/Constants';
import Guild from './Guild';
import Overwrite from './Overwrite';
export default class {
    private id;
    private type;
    private guild;
    private position;
    private permissionOverwrites;
    private name;
    private topic;
    private nsfw;
    private bitrate;
    private userLimit;
    private rateLimitPerUser;
    private recipients;
    private icon;
    private ownerID;
    private applicationID;
    private parentID;
    private lastpinTimestamp;
    constructor(id: string, type: CHANNELTYPES, guild: Guild, position: number, permissionOverwrites: Array<Overwrite>, name: string, topic: string, nsfw: boolean, bitrate: number, userLimit: number, rateLimitPerUser: number, recipients: Array<User>, icon: string, ownerID: string, applicationID: string, parentID: string, lastpinTimestamp: number);
}
