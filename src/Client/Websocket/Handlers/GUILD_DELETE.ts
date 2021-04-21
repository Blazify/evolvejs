import { EvolveClient, EVENTS, Payload, Endpoints } from "../../..";
import { IGuild } from "../../../Interfaces/GuildOptions";
import { Guild } from "../../../Structures/Guild/Guild";
import { GuildEvents } from "../../Events/GuildEvents";

export default class {
  constructor(client: EvolveClient, payload: Payload, shard: number) {
    (async () => {
      const o = new Guild(
        await client.rest.endpoint(Endpoints.GUILD).get<IGuild>(payload.d),
        client
      );
      if (client.options.enableGuildCache) client.guilds.delete(o.id);
      client.emit(EVENTS.GUILD_DELETE, new GuildEvents(client, o, shard));
    })();
  }
}
