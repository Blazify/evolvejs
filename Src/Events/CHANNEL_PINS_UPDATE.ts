import { Payload } from "../Interfaces/Interfaces";
import { EvolveClient, EVENTS } from "..";

export default class {
    constructor(client: EvolveClient, payload: Payload, shard: number) {
        const { guild_id, channel_id, last_pin_timestamp } = payload.d(async () => {
            let guild = await client.api.getGuild(guild_id)
            let channel = await client.api.getChannel(channel_id)
            client.emit(EVENTS.CHANNEL_PINS_UPDATE, guild, channel, last_pin_timestamp);
        })

    }
}
