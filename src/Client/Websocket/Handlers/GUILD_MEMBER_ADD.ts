import {
  EvolveClient,
  EVENTS,
  Payload,
  GuildMember,
  User,
  Endpoints,
} from "../../..";
import { IGuild } from "../../../Interfaces/GuildOptions";
import { Guild } from "../../../Structures/Guild/Guild";
import { GuildMemberEvent } from "../../Events/GuildMemberEvents";

export default class {
  constructor(client: EvolveClient, payload: Payload, shard: number) {
    const member = new GuildMember(payload.d);
    (async () => {
      const o = await client.rest
        .endpoint(Endpoints.GUILD)
        .get<IGuild>(payload.d.guild_id);
      if (client.options.enableUsersCache)
        client.users.set(member.user?.id as string, member.user as User);
      client.emit(
        EVENTS.GUILD_MEMBER_ADD,
        new GuildMemberEvent(client, member, new Guild(o, client), shard)
      );
    })();
  }
}
