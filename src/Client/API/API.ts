/* eslint-disable no-mixed-spaces-and-tabs */

import { RestAPIHandler ,TextChannel, DMChannel, VoiceChannel, GroupChannel, CategoryChannel, NewsChannel, StoreChannel, EvolveClient, Guild, Channel, User, GuildMember, MessageEmbed, Message, CHANNELTYPES } from "../..";

/**
 * API CLASS
 *
 * @param {client} - Your EvolveClient
 */
export class API {
	public client: EvolveClient;
	public handler: RestAPIHandler

	constructor(client: EvolveClient) {
		this.client = client;
		this.handler = new RestAPIHandler(this.client);
	}


	public async getGuild(guildID: string): Promise<Guild> {
    	return new Guild(await this.handler.fetch({
			endpoint: `guilds/${guildID}`,
			method: "GET"
		}), this.client);
	}

	public async getGuildChannels(guildID: string): Promise<Channel[]> {
    	const channels = await this.handler.fetch({
    		endpoint: `guilds/${guildID}/channels`,
    		method: "GET"
		});

    	const channelArray = [];

    	for (const c of channels) {
			if (c.type === CHANNELTYPES.Category) {
				channelArray.push(new CategoryChannel(c, this.client));
			} else if (c.type === CHANNELTYPES.Direct) {
				channelArray.push(new DMChannel(c, this.client));
			} else if (c.type === CHANNELTYPES.Group) {
				channelArray.push(new GroupChannel(c, this.client));
			} else if (c.type === CHANNELTYPES.News) {
				channelArray.push(new NewsChannel(c, this.client));
			} else if (c.type === CHANNELTYPES.Store) {
				channelArray.push(new StoreChannel(c, this.client));
			} else if (c.type === CHANNELTYPES.Text) {
				channelArray.push(new TextChannel(c, this.client));
			} else if (c.type === CHANNELTYPES.Voice) {
				channelArray.push(new VoiceChannel(c, this.client));
			}
    	}

    	return channelArray;
	}

	public async getAuditLogs(guildID: string): Promise<void> {
    	return await this.handler.fetch({
    		endpoint: `/guilds/${ guildID }/audit-logs`,
    		method: "POST"
    	}); 
	}

	public async getUser(userID: string): Promise<User> {
    	return new User(await this.handler.fetch( {
    		endpoint: `users/${ userID }`,
    		method: "GET"
    	}));
	}

	public async getGuildMembers(guildID: string): Promise<GuildMember[]> {
    	const memberArray = new Array<GuildMember>();
    	const member = await this.handler.fetch( {
    		endpoint: `guilds/${ guildID }/members`,
    		method: "GET"
    	});

    	for (const m of member) {
    		memberArray.push(m);
    	}

    	return memberArray;
	}

	public async sendMessage(content: string | MessageEmbed, channelID: string): Promise<Message> {
		let fetched;
		if(typeof content == "string") {
			fetched = await this.handler.fetch({
    		endpoint: `channels/${ channelID }/messages`,
    		method: "POST",
    		message: {
					content: content
				}
			});
		} else {
			fetched = await this.handler.fetch({
				endpoint: `channels/${channelID}/messages`,
				method: "POST",
				message: {
					embed: content
				}
			});
		}
		const channel = await this.getTextChannel(fetched.channel_id);
		return new Message(fetched, channel, channel.guild);
	}

	public async deleteMessage(messageID: string, channelID: string, time: number): Promise<NodeJS.Timeout> {
    	return setTimeout(async () => {
    		return await this.handler.fetch( {
    			endpoint: `/channels/${ channelID }/messages/${ messageID }`,
    			method: "DELETE"
    		});
    	}, time);
	}

	public async banAdd(guildID: string, userID: string): Promise<void> {
    	return await this.handler.fetch( {
    		endpoint: `guilds/${ guildID }/bans/${ userID }`,
    		method: "PUT"
    	});
	}

	public async banRemove(userID: string, guildID: string): Promise<void> {
    	return await this.handler.fetch( {
    		endpoint: `guilds/${ guildID }/bans/${ userID }`,
    		method: "DELETE"
    	});
	}

	public async getChannel(channelID: string): Promise<Channel> {
    	const c = await this.handler.fetch({
    		endpoint: `/channels/${ channelID }`,
    		method: "GET"
    	});

    	if (c.type === CHANNELTYPES.Category) {
    		return (new CategoryChannel(c, this.client));
    	} else if (c.type === CHANNELTYPES.Direct) {
    		return (new DMChannel(c, this.client));
    	} else if (c.type === CHANNELTYPES.Group) {
    		return (new GroupChannel(c, this.client));
    	} else if (c.type === CHANNELTYPES.News) {
    		return (new NewsChannel(c, this.client));
    	} else if (c.type === CHANNELTYPES.Store) {
    		return (new StoreChannel(c, this.client));
    	} else if (c.type === CHANNELTYPES.Text) {
    		return (new TextChannel(c, this.client));
    	} else if (c.type === CHANNELTYPES.Voice) {
    		return (new VoiceChannel(c, this.client));
		}
		
		return c;
	}

	public async getTextChannel(channel: string): Promise<TextChannel> {
		const fetched = new TextChannel(await this.handler.fetch({
			endpoint: `/channels/${channel}`,
			method: "GET"
		}), this.client);
		return fetched;
	}
}
