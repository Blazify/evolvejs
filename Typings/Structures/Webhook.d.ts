import { Snowflake } from "../Constants/Constants";
import Guild from "./Guild";
import Channel from "./Channel";
import User from "./User";
export default class {
    private id;
    private type;
    private guild;
    private channel;
    private user;
    private name;
    private avatar;
    private token;
    constructor(id: Snowflake, type: number, guild: Guild, channel: Channel, user: User, name: string, avatar: string, token: string);
}
