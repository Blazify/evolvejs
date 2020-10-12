import { EvolveClient, EVENTS, Payload } from "../../..";
import { GuildEvents } from "../../Events/GuildEvents";

export default class {
  constructor(client: EvolveClient, payload: Payload, shard: number) {
    (async () => {
      const o = await client.rest.getGuild(payload.d);
      if (client.options.enableGuildCache) client.guilds.delete(o.id);
      client.emit(EVENTS.GUILD_DELETE, new GuildEvents(client, o, shard));
    })();
  }
}
