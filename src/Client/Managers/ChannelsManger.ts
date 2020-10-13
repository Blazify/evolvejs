import { Objex } from "@evolvejs/objex";
import { ChannelOptions } from "../../Interfaces/Interfaces";
import { Channel } from "../../Structures/Channel/Channel";
import { Guild } from "../../Structures/Guild/Guild";
import { ChannelResolver, ChannelTypes } from "../../Utils/Constants";
import { Endpoints } from "../../Utils/Endpoints";
import { EvolveClient } from "../EvolveClient";

export class ChannelsManager extends Objex<string, ChannelTypes> {
  private client!: EvolveClient;
  private guild!: Guild;
  constructor(client: EvolveClient, guild?: Guild) {
    super();
    Object.defineProperty(this, "client", {
      value: client,
      enumerable: false,
      writable: false,
    });
    if (guild) this.guild = guild;
  }

  public get(id: string): ChannelTypes | undefined {
    let channel = super.get(id);
    (async () => {
      channel =
        channel ??
        new ChannelResolver[channel!!.type](
          await this.client.rest.get(Endpoints.CHANNEL).get<any>(id),
          this.client
        );
      return channel;
    })();
    return channel;
  }

  public new(options: ChannelOptions, guild?: Guild): ChannelTypes {
    if (guild) this.guild = guild;
    if (!this.guild)
      throw this.client.logger.error("No Guild Found for Creating the Channel");
    let channel: ChannelTypes = ({} as unknown) as ChannelTypes;
    this.client.rest
      .get(Endpoints.GUILD_CHANNELS)
      .post<any>(options, this.guild.id)
      .then((c) => {
        channel = new ChannelResolver[c.type](c, this.client);
      })
      .catch((e) => {
        throw this.client.logger.error(e.message);
      })
      .finally(() => {
        super.set(channel.id, channel);
      });

    return channel;
  }

  public delete(id: string, onlyFromCache: boolean = false): boolean {
    if (!onlyFromCache) this.client.rest.get(Endpoints.CHANNEL).delete(id);
    return super.delete(id);
  }
}
