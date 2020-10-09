/* eslint-disable no-mixed-spaces-and-tabs */

import {
  Channel,
  ChannelOptions,
  ChannelResolver,
  ChannelTypes,
  Emoji,
  Guild,
  GuildMember,
  Invite,
  Message,
  MessageEmbed,
  TextChannel,
  User,
  IRole,
  Webhook,
} from "../..";
import { RestAPIHandler } from "./RestAPIHandler";
import { EvolveClient } from "../EvolveClient";
import { IGuildIntegration } from "../../Interfaces/Integration";

/**
 * RestAPI Class
 *
 * @param {client} - Your EvolveClient
 */
export class RestAPI {
  public client!: EvolveClient;
  public handler: RestAPIHandler;

  constructor(client: EvolveClient) {
    Object.defineProperty(this, "client", {
      value: client,
      enumerable: false,
      writable: false,
    });
    this.handler = new RestAPIHandler(this.client);
  }

  public async getGuild(guildID: string): Promise<Guild> {
    return new Guild(
      await this.handler.fetch({
        endpoint: `guilds/${guildID}`,
        method: "GET",
      }),
      this.client
    );
  }
  public async getGuildPrieview(guildID: string): Promise<any> {
    return await this.handler.fetch({
      endpoint: `guilds/${guildID}/preview`,
      method: "GET",
    });
  }
  public async getGuildRoles(guildID: string): Promise<IRole[]> {
    const result = await this.handler.fetch({
      endpoint: `guilds/${guildID}/roles`,
      method: "GET",
    });
    const roles = new Array<IRole>();
    for (const role of result) {
      roles.push(role);
    }
    return roles;
  }
  public async getGuildChannels(guildID: string): Promise<ChannelTypes[]> {
    const channels = await this.handler.fetch({
      endpoint: `guilds/${guildID}/channels`,
      method: "GET",
    });

    const channelArray: ChannelTypes[] = [];

    for (const c of channels) {
      if (ChannelResolver[c.type]) {
        channelArray.push(new ChannelResolver[c.type](c, this.client));
      }
    }

    return channelArray;
  }

  public async getAuditLogs(guildID: string): Promise<JSON> {
    return await this.handler.fetch({
      endpoint: `guilds/${guildID}/audit-logs`,
      method: "POST",
    });
  }

  public async getUser(userID: string): Promise<User> {
    return new User(
      await this.handler.fetch({
        endpoint: `users/${userID}`,
        method: "GET",
      })
    );
  }
  public async getGuildIntegrations(
    guildID: string
  ): Promise<IGuildIntegration[]> {
    const guildIntegrationArray = new Array<IGuildIntegration>();
    const list = await this.handler.fetch({
      endpoint: `guilds/${guildID}/integrations`,
      method: "GET",
    });
    for (const e of list) {
      guildIntegrationArray.push(e);
    }
    return guildIntegrationArray;
  }
  public async createGuildIntegration(
    guildID: string,
    type: string,
    id: string
  ): Promise<any> {
    return await this.handler.fetch({
      endpoint: `guilds/${guildID}/channels`,
      method: "POST",
      postType: "Channel",
      integration: {
        type: type,
        id: id,
      },
    });
  }
  public async getGuildMembers(guildID: string): Promise<GuildMember[]> {
    const memberArray = new Array<GuildMember>();
    const member = await this.handler.fetch({
      endpoint: `guilds/${guildID}/members`,
      method: "GET",
    });

    for (const m of member) {
      memberArray.push(m);
    }

    return memberArray;
  }

  public async sendMessage(
    content: string | MessageEmbed,
    channelID: string
  ): Promise<Message> {
    let fetched;
    if (typeof content == "string") {
      fetched = await this.handler.fetch({
        endpoint: `channels/${channelID}/messages`,
        method: "POST",
        postType: "Message",
        message: {
          content: content,
        },
      });
    } else {
      fetched = await this.handler.fetch({
        endpoint: `channels/${channelID}/messages`,
        method: "POST",
        postType: "Message",
        message: {
          embed: content,
        },
      });
    }
    return Message.handle(fetched, this.client);
  }

  public async deleteMessage(
    messageID: string,
    channelID: string,
    time: number
  ): Promise<NodeJS.Timeout> {
    return setTimeout(async () => {
      return await this.handler.fetch({
        endpoint: `channels/${channelID}/messages/${messageID}`,
        method: "DELETE",
      });
    }, time);
  }

  public async banAdd(guildID: string, userID: string): Promise<void> {
    return await this.handler.fetch({
      endpoint: `guilds/${guildID}/bans/${userID}`,
      method: "PUT",
    });
  }

  public async banRemove(userID: string, guildID: string): Promise<void> {
    return await this.handler.fetch({
      endpoint: `guilds/${guildID}/bans/${userID}`,
      method: "DELETE",
    });
  }

  public async getChannel(channelID: string): Promise<ChannelTypes> {
    const c = await this.handler.fetch({
      endpoint: `channels/${channelID}`,
      method: "GET",
    });
    let channel: ChannelTypes = new TextChannel(c, this.client);
    if (ChannelResolver[c.type])
      channel = new ChannelResolver[c.type](c, this.client);

    return channel;
  }

  public async getGuildEmojis(guildID: string): Promise<Emoji[]> {
    const fetched = await this.handler.fetch({
      endpoint: `guilds/${guildID}/emojis`,
      method: "GET",
    });
    const emojiArray: Emoji[] = [];

    for (const emoji of fetched) {
      emojiArray.push(new Emoji(emoji));
    }
    return emojiArray;
  }

  public async getGuildInvites(guildID: string): Promise<Invite[]> {
    const fetched = await this.handler.fetch({
      endpoint: `guilds/${guildID}/invites`,
      method: "GET",
    });

    const invite: Invite[] = [];
    for (const invite of fetched) {
      invite.push(new Invite(invite, this.client));
    }

    return invite;
  }

  public async getChannelInvites(channelID: string): Promise<Array<Invite>> {
    const fetched = await this.handler.fetch({
      endpoint: `channels/${channelID}/invites`,
      method: "GET",
    });

    const inviteArray: Array<Invite> = [];
    for (const f of fetched) {
      inviteArray.push(new Invite(f, this.client));
    }
    return inviteArray;
  }

  public async createChannel(
    guildID: string,
    options: ChannelOptions
  ): Promise<ChannelTypes> {
    const c = await this.handler.fetch({
      endpoint: `guilds/${guildID}/channels`,
      method: "POST",
      postType: "Channel",
      channel: options,
    });
    let channel: ChannelTypes = new TextChannel(c, this.client);
    if (ChannelResolver[c.type])
      channel = new ChannelResolver[c.type](c, this.client);

    return channel;
  }

  public async deleteChannel(channelID: string): Promise<void> {
    return await this.handler.fetch({
      endpoint: `channels/${channelID}`,
      method: "DELETE",
    });
  }
  public async getGuildWebhooks(guildID: string): Promise<Webhook[]> {
    const fetched = await this.handler.fetch({
      endpoint: `/guilds/${guildID}/webhooks`,
      method: "GET",
    });

    const guildWebhooksArray = [];

    for (const f of fetched) {
      guildWebhooksArray.push(new Webhook(f, this.client));
    }

    return guildWebhooksArray;
  }

  public async getWebhook(webhookID: string): Promise<Webhook> {
    return new Webhook(
      await this.handler.fetch({
        endpoint: `/webhooks/${webhookID}`,
        method: "GET",
      }),
      this.client
    );
  }

  public async getChannelWebhooks(channelID: string): Promise<Webhook[]> {
    const fetched = await this.handler.fetch({
      endpoint: `/channels/${channelID}/webhooks`,
      method: "GET",
    });

    const channelWebhooksArray = [];

    for (const f of fetched) {
      channelWebhooksArray.push(new Webhook(f, this.client));
    }

    return channelWebhooksArray;
  }

  public async deleteWebhook(webhookID: string): Promise<void> {
    return await this.handler.fetch({
      endpoint: `/webhooks/${webhookID}`,
      method: "DELETE",
    });
  }

  public async modifyChannel(
    channelID: string,
    channel: ChannelOptions
  ): Promise<ChannelTypes> {
    const fetched = await this.handler.fetch({
      endpoint: `/channels/${channelID}`,
      method: "PATCH",
      postType: "Channel",
      channel,
    });

    const newChannel = new ChannelResolver[fetched.type](fetched, this.client);

    return newChannel;
  }

  public async getChannelMessages(channelID: string): Promise<Message[]> {
    const mArray: Message[] = [];
    const fetched = await this.handler.fetch({
      endpoint: `/channels/${channelID}/messages`,
      method: "GET",
    });
    for (const f of fetched) {
      mArray.push(await Message.handle(f, this.client));
    }
    return mArray;
  }

  public async getChannelMessage(
    channelID: string,
    messageID: string
  ): Promise<Message> {
    return await Message.handle(
      await this.handler.fetch({
        endpoint: `/channels/${channelID}/messages/${messageID}`,
        method: "GET",
      }),
      this.client
    );
  }

  public async crosspostMessage(
    channelID: string,
    messageID: string
  ): Promise<Message> {
    return await Message.handle(
      await this.handler.fetch({
        endpoint: `/channels/${channelID}/messages/${messageID}/crosspost`,
        method: "POST",
      }),
      this.client
    );
  }

  public async createReaction(
    channelID: string,
    messageID: string,
    emoji: string
  ): Promise<void> {
    return this.handler.fetch({
      endpoint: `/channels/${channelID}/messages/${messageID}/reactions/${encodeURI(
        emoji
      )}/@me`,
      method: "PUT",
    });
  }

  public async deleteReaction(
    channelID: string,
    messageID: string,
    emoji: string
  ): Promise<void> {
    return this.handler.fetch({
      endpoint: `/channels/${channelID}/messages/${messageID}/reactions/${encodeURI(
        emoji
      )}/@me`,
      method: "DELETE",
    });
  }

  public async deleteUserReaction(
    channelID: string,
    messageID: string,
    emoji: string,
    userID: string
  ): Promise<void> {
    return this.handler.fetch({
      endpoint: `/channels/${channelID}/messages/${messageID}/reactions/${encodeURI(
        emoji
      )}/${userID}`,
      method: "DELETE",
    });
  }

  public async getEmojiReactions(
    channelID: string,
    messageID: string,
    emoji: string
  ): Promise<User[]> {
    const userArray: User[] = [];
    const fetched = await this.handler.fetch({
      endpoint: `/channels/${channelID}/messages/${messageID}/reactions/${encodeURI(
        emoji
      )}`,
      method: "GET",
    });
    for (const f of fetched) {
      userArray.push(new User(f));
    }
    return userArray;
  }

  public async deleteAllReactions(
    channelID: string,
    messageID: string
  ): Promise<void> {
    return this.handler.fetch({
      endpoint: `/channels/${channelID}/messages/${messageID}/reactions`,
      method: "DELETE",
    });
  }

  public async deleteEmojiReactions(
    channelID: string,
    messageID: string,
    emoji: string
  ): Promise<void> {
    return this.handler.fetch({
      endpoint: `/channels/${channelID}/messages/${messageID}/reactions/${encodeURI(
        emoji
      )}`,
      method: "DELETE",
    });
  }

  public async editMessage(
    channelID: string,
    messageID: string,
    content: string | MessageEmbed
  ): Promise<Message> {
    return await Message.handle(
      await this.handler.fetch({
        endpoint: `/channels/${channelID}/messages/${messageID}`,
        method: "PATCH",
        postType: "Message",
        message: typeof content == "string" ? { content } : { embed: content },
      }),
      this.client
    );
  }

  public async bulkDelete(
    channelID: string,
    amount: number,
    messages?: string[]
  ): Promise<void> {
    if (!messages) messages = this.client.messages.lastKey(amount) as string[];
    return this.handler.fetch({
      endpoint: `/channels/${channelID}/messages/bulk-delete`,
      method: "POST",
      postType: "[Message]",
      messages,
    });
  }
}
