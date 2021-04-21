import { EvolveClient, EVENTS, Payload, Role, Endpoints } from "../../..";
import { IGuild } from "../../../Interfaces/GuildOptions";
import { Guild } from "../../../Structures/Guild/Guild";
import { GuildRoleEvents } from "../../Events/GuildRoleEvents";

export default class {
  constructor(client: EvolveClient, payload: Payload, shard: number) {
    (async () => {
      const { guild_id, role } = payload.d;
      const guild = await client.rest
        .endpoint(Endpoints.GUILD)
        .get<IGuild>(guild_id);

      client.emit(
        EVENTS.GUILD_ROLE_CREATE,
        new GuildRoleEvents(
          client,
          new Role(role),
          new Guild(guild, client),
          shard
        )
      );
    })();
  }
}
