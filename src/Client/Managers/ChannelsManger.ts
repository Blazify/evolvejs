import { Objex } from "@evolvejs/objex.ts";
import { ChannelOptions } from "../../Interfaces/Interfaces.ts";
import { Guild } from "../../Structures/Guild/Guild.ts";
import { ChannelTypes } from "../../Utils/Constants.ts";
import { EvolveClient } from "../EvolveClient.ts";

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
 		channel = channel ?? (await this.client.rest.getChannel(id));
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
 		.createChannel(this.guild.id, options)
 		.then((c) => {
 			channel = c;
 		})
 		.catch((e) => {
 			throw this.client.logger.error(e.message);
 		})
 		.finally(() => {
 			super.set(channel.id, channel);
 		});

 	return channel;
 }

 public delete(id: string): boolean {
 	this.client.rest.deleteChannel(id);
 	return super.delete(id);
 }
}
