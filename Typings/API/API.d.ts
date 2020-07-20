import { Snowflake } from "../Constants/Constants";
import { Client } from "../Client/Client";
export default class API {
    client: Client;
    constructor();
    getGuild(guildID: Snowflake): Promise<any>;
    getGuildChannels(guildID: Snowflake): Promise<any>;
    getUser(userID: Snowflake): Promise<any>;
    getGuildMembers(guildID: Snowflake): Promise<any>;
    sendMessage(content: string, channelID: Snowflake): Promise<any>;
    deleteMessage(messageID: Snowflake, channelID: Snowflake): Promise<any>;
    banAdd(guildID: Snowflake, userID: Snowflake): Promise<any>;
    banRemove(userID: Snowflake, guildID: Snowflake): Promise<any>;
}
