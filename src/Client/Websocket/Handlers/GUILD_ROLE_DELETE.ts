import { EvolveClient, EVENTS, Payload, Endpoints } from "../../..";
import { IGuild } from "../../../Interfaces/GuildOptions";
import { Guild } from "../../../Structures/Guild/Guild";
import { GuildRoleEvents } from "../../Events/GuildRoleEvents";

export default class {
  constructor(client: EvolveClient, payload: Payload, shard: number) {
    (async () => {
      const { guild_id, role_id } = payload.d;
      const guild = await client.rest
        .get(Endpoints.GUILD)
        .get<IGuild>(guild_id);
      const role = client.roles.get(role_id);

      client.emit(
        EVENTS.GUILD_ROLE_DELETE,
        new GuildRoleEvents(client, role, new Guild(guild, client), shard)
      );
    })();
  }
}
