import { Snowflake, CHANNELTYPES } from '../Constants/Constants';
import RestAPIHandler from './RestAPIHandler';
import { EvolveClient } from '../Client/EvolveClient';
import { Guild } from '../Structures/Guild/Guild';
import CategoryChannel from '../Structures/Channel/CategoryChannel';
import DMChannel from '../Structures/Channel/DMChannel';
import GroupChannel from '../Structures/Channel/GroupChannel';
import NewsChannel from '../Structures/Channel/NewsChannel';
import StoreChannel from '../Structures/Channel/StoreChannel';
import TextChannel from '../Structures/Channel/TextChannel';
import VoiceChannel from '../Structures/Channel/VoiceChannel';
import { User } from '../Structures/User/User';
import { GuildMember } from '../Structures/Guild/GuildMember';
import { Message } from '../Structures/Message/Message';

export default class API {
	public client: EvolveClient;

	constructor(client: EvolveClient) {
		this.client = client;
	}
	public async getGuild(guildID: Snowflake) {
		return new Guild(await RestAPIHandler(this.client, {
			endpoint: `guilds/${guildID}`,
			method: 'GET'
		}), this.client);
	}

	public async getGuildChannels(guildID: Snowflake) {
		let channel = await RestAPIHandler(this.client, {
			endpoint: `guilds/${guildID}/channels`,
			method: 'GET'
		})
		let channelArray = new Array()

		for(let c of channel) {
			if(c.type === CHANNELTYPES.Category) {
				channelArray.push(new CategoryChannel(c, this.client));
				} else if(c.type === CHANNELTYPES.Direct) {
					channelArray.push(new DMChannel(c, this.client));
				} else if(c.type === CHANNELTYPES.Group) {
					channelArray.push(new GroupChannel(c, this.client));
				} else if(c.type === CHANNELTYPES.News) {
				    channelArray.push(new NewsChannel(c, this.client));
				} else if(c.type === CHANNELTYPES.Store) {
					channelArray.push(new StoreChannel(c, this.client));
				} else if(c.type === CHANNELTYPES.Text) {
					channelArray.push(new TextChannel(c, this.client));
				} else if(c.type === CHANNELTYPES.Voice) {
					channelArray.push(new VoiceChannel(c, this.client));
				}
		}

		return channelArray;
	}

	public async getAuditLogs(guildID: Snowflake) {
		return await RestAPIHandler(this.client, {
			endpoint: `/guilds/${guildID}/audit-logs`,
			method: 'POST'
	})
}
	public async getUser(userID: Snowflake) {
		return new User(await RestAPIHandler(this.client, {
			endpoint: `users/${userID}`,
			method: 'GET'
		}));
	}

	public async getGuildMembers(guildID: Snowflake) {
		let memberArray = new Array<GuildMember>()
		let member = await RestAPIHandler(this.client, {
			endpoint: `guilds/${guildID}/members`,
			method: 'GET'
		});

		for(let m of member) {
			memberArray.push(m)
		}

		return memberArray;
	}

	public async sendMessage(content: string, channelID: Snowflake) {
		return new Message(await RestAPIHandler(this.client, {
			endpoint: `channels/${channelID}/messages`,
			method: 'POST',
			content: content
		}), this.client);
	}

	public async deleteMessage(messageID: Snowflake, channelID: Snowflake, time: number) {
	return setTimeout(async() => {
			return await RestAPIHandler(this.client, {
			endpoint: `/channels/${channelID}/messages/${messageID}`,
			method: 'DELETE'
		});
	}, time)
}

	public async banAdd(guildID: Snowflake, userID: Snowflake) {
		return await RestAPIHandler(this.client, {
			endpoint: `guilds/${guildID}/bans/${userID}`,
			method: 'PUT'
		});
	}

	public async banRemove(userID: Snowflake, guildID: Snowflake) {
		return await RestAPIHandler(this.client, {
			endpoint: `guilds/${guildID}/bans/${userID}`,
			method: 'DELETE'
		});
	}
	public async getChannel(channelID: Snowflake) {
		let c = await RestAPIHandler(this.client, {
			endpoint: `/channels/${channelID}`,
			method: "GET"
		})

		if(c.type === CHANNELTYPES.Category) {
			return(new CategoryChannel(c, this.client));
			} else if(c.type === CHANNELTYPES.Direct) {
				return(new DMChannel(c, this.client));
			} else if(c.type === CHANNELTYPES.Group) {
				return(new GroupChannel(c, this.client));
			} else if(c.type === CHANNELTYPES.News) {
				return(new NewsChannel(c, this.client));
			} else if(c.type === CHANNELTYPES.Store) {
				return(new StoreChannel(c, this.client));
			} else if(c.type === CHANNELTYPES.Text) {
				return(new TextChannel(c, this.client));
			} else if(c.type === CHANNELTYPES.Voice) {
				return(new VoiceChannel(c, this.client));
			}
			return c;
	}
}
