import { Snowflake } from '../Constants/Constants';
export interface IAPIParams {
    guildID?: Snowflake;
    userID?: Snowflake;
    channelID?: Snowflake;
    messageID?: Snowflake;
    content?: string;
    tts?: boolean;
}
