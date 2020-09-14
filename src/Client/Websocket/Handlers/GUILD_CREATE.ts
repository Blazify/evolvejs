import { EvolveClient, EVENTS, Payload, Guild } from "../../..";
import { GuildEvents } from "../../Events/GuildEvents";

export default class {
  constructor(client: EvolveClient, payload: Payload, shard: number) {
    const guild = payload.d;
    if (client.guilds.get(guild.id)) {
      return;
    } else {
      const newGuild = new Guild(guild, client);

      client.emit(
        EVENTS.GUILD_CREATE,
        new GuildEvents(client, newGuild, shard)
      );
    }
  }
}
