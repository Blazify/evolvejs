import { EvolveClient, EVENTS, Payload } from "../../..";
import { TextChannel } from "../../../Structures/Channel/TextChannel";
import { MessageEvents } from "../../Events/MessageEvents";

export default class {
  constructor(client: EvolveClient, payload: Payload, shard: number) {
    const { id, guild_id, channel_id } = payload.d;
    const message = client.messages.get(id);
    const guild = client.guilds.get(guild_id);
    const channel = client.channels.get(channel_id) as TextChannel;
    if (client.options.enableMessageCache) client.messages.delete(id);
    client.emit(
      EVENTS.MESSAGE_DELETE,
      new MessageEvents(client, message, guild, channel, shard)
    );
  }
}
