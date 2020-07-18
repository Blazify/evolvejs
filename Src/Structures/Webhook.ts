import { Snowflake } from "../Constants/Constants";
import Guild from "./Guild";
import Channel from "./Channel";
import User from "./User";

export default class {
    constructor(
        public id: Snowflake,
        public type: number,
        public guild: Guild,
        public channel: Channel,
        public user: User,
        public name: string,
        public avatar: string,
        public token: string
    ) {

    }
}