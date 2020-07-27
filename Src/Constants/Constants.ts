import { IDMChannel } from '../Interfaces/DMChannelOptions';
import { ITextChannel } from '../Interfaces/TextChannelOptions';
import { ICategoryChannel } from '../Interfaces/CategoryChannelOptions';
import { INewsChannel } from '../Interfaces/NewsChannelOptions';
import { IVoiceChannel } from '../Interfaces/VoiceChannelOptions';
import { IGroupChannel } from '../Interfaces/GroupChannelOptions';
import { IStoreChannel } from '../Interfaces/StoreChannelOptions';

export enum CONSTANTS {
	Gateway = 'wss://gateway.discord.gg/?v=6&encoding=json',
	Api = 'https://discord.com/api/v6'
}

export enum CHANNELTYPES {
	Text = 0,
	Direct = 1,
	Voice = 2,
	Group = 3,
	Category = 4,
	News = 5,
	Store = 6
}

export enum ACTIVITY {
	Game = 0,
	Stream = 1,
	Listening = 2,
	Custom = 3
}

export const NITRO = {
	0: 'None',
	1: 'Nitro Classic',
	2: 'Nitro'
};

export enum WEBHOOKTYPE {
	Incoming = 1,
	Channel_Follower = 2
}

export type Visibility = 'idle' | 'dnd' | 'online' | 'offline';
export type Snowflake = string;
export type ChannelResolvable =
	| ITextChannel
	| IDMChannel
	| IVoiceChannel
	| IGroupChannel
	| ICategoryChannel
	| INewsChannel
	| IStoreChannel;
