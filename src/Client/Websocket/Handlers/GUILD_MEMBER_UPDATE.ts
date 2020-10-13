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
    const { guild_id, roles, user, nick, joined_at, premium_since } = payload.d;
    const member = new GuildMember({
      user,
      nick,
      roles,
      joined_at,
      premium_since,
      deaf: false,
      mute: false,
    });
    if (client.options.enableUsersCache)
      client.users.set(member.user?.id as string, member.user as User);

    (async () => {
      const o = await client.rest.get(Endpoints.GUILD).get<IGuild>(guild_id);
      client.emit(
        EVENTS.GUILD_MEMBER_UPDATE,
        new GuildMemberEvent(client, member, new Guild(o, client), shard)
      );
    })();
  }
}
