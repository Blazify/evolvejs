import { Snowflake } from "../Constants/Constants";
import Guild from "./Guild";
import Channel from "./Channel";
import User from "./User";

export default class {
    constructor(
        private id: Snowflake,
        private type: number,
        private guild: Guild,
        private channel: Channel,
        private user: User,
        private name: string,
        private avatar: string,
        private token: string
    ) {

    }
}