/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-mixed-spaces-and-tabs */

import { User, GuildMember, Guild, IMessage, Endpoints } from "../..";
import { TextChannel } from "../Channel/TextChannel";
import { EvolveClient } from "../../Client/EvolveClient";
import { promisify } from "util";
import { IGuild } from "../../Interfaces/GuildOptions";

export class Message {
  public sentAt!: string;
  public id!: string;
  public pinned!: boolean;
  public mentions: User[] = [];
  public rolementions?: Array<string>;
  public mentionEveryone!: boolean;
  public member!: GuildMember | undefined;
  public author!: User;
  public editedTimestamp!: number | null;
  public attachments!: Array<string>;
  public content!: string;
  public guild!: Guild;
  public channel!: TextChannel;
  public data!: IMessage;
  private client!: EvolveClient;

  constructor(
    data: IMessage,
    client: EvolveClient,
    channel: TextChannel,
    guild?: Guild
  ) {
    Object.defineProperty(this, "client", {
      value: client,
      writable: false,
      enumerable: false,
    });
    Object.defineProperty(this, "data", {
      value: data,
      enumerable: false,
      writable: false,
    });
    if (!this.data) return;
    if (this.data.mentions)
      for (const it of this.data.mentions) {
        this.mentions.push(new User(it));
      }
    this.channel = channel;
    if (guild) this.guild = guild;
    if (this.data.guild_id)
      this.client.rest.endpoint(Endpoints.GUILD).get<Guild>(this.data.guild_id);
    this.sentAt = this.data.sent_at;
    this.id = this.data.id;
    this.pinned = this.data.pinned;
    this.rolementions = this.data.mention_roles;
    this.mentionEveryone = this.data.mention_everyone;
    if (this.data.member) this.member = new GuildMember(this.data.member);
    this.author = new User(this.data.author);
    if (this.member) this.member.user = this.author;
    this.editedTimestamp = this.data.edited_timestamp;
    this.attachments = this.data.attachments;
    this.content = this.data.content;
    return this;
  }

  public async delete(time = 0): Promise<void> {
    await promisify(setTimeout)(time);
    return await this.client.rest
      .endpoint(Endpoints.CHANNEL_MESSAGE(this.channel.id))
      .delete(this.id);
  }

  static async handle(data: IMessage, client: EvolveClient): Promise<Message> {
    let message: Message;
    let guild: Guild;
    let channel: any = client.channels.get(data.channel_id);
    if (data.guild_id) {
      guild =
        client.guilds.get(data.guild_id) ??
        new Guild(
          await client.rest
            .endpoint(Endpoints.GUILD)
            .get<IGuild>(data.guild_id),
          client
        );
      channel = channel ?? guild.channels.get(data.channel_id);
      message = new Message(data, client, channel, guild);
    } else message = new Message(data, client, channel);
    console.log(message);
    return message;
  }
}
