import { ChannelOptions } from "../../Interfaces/Interfaces.ts";
import { Guild } from "../../Structures/Guild/Guild.ts";
import { ChannelTypes } from "../../Utils/Constants.ts";
import { EvolveClient } from "../EvolveClient.ts";

export class ChannelsManager extends Map<string, ChannelTypes> {
  private client: EvolveClient;
  private guild!: Guild;
  constructor(client: EvolveClient, guild?: Guild) {
  	super();
  	this.client = client;
  	if (guild) this.guild = guild;
  }

  public get(id: string): ChannelTypes | undefined {
  	let channel = super.get(id);
  	if (!channel)
  		this.client.rest
  			.getChannel(id)
  			.then((newChannel: ChannelTypes) => {
  				channel = newChannel;
  			})
  			.catch((error: Error) => {
  				throw this.client.logger.error(error.message);
  			});
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
