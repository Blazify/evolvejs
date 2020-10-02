import {
	IGuild,
	IGuildMember,
	IUser,
	ITextChannel,
	IEmoji,
	IMessage,
} from "../.ts";

export interface IMessageReaction {
 guild: IGuild;
 member: IGuildMember;
 user: IUser;
 channel: ITextChannel;
 emoji: IEmoji;
 message: IMessage;
}
