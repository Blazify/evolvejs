import { Objex } from "@evolvejs/objex";
import { ChannelOptions } from "../../Interfaces/Interfaces";
import { Guild } from "../../Structures/Guild/Guild";
import {
	ChannelResolvable,
	ChannelResolver,
	ChannelTypes,
} from "../../Utils/Constants";
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

	public async resolve(id: string): Promise<ChannelTypes> {
		let channel: ChannelTypes = (super.get(id) as unknown) as ChannelTypes;
		if (channel) return channel;

		const request = await this.client.rest
			.endpoint(Endpoints.CHANNEL)
			.get<ChannelResolvable>(id);
		return new ChannelResolver[request.type](request as never, this.client);
	}

	public async new(
		options: ChannelOptions,
		guild?: Guild
	): Promise<ChannelTypes> {
		if (!guild) guild = this.guild;
		if (!guild)
			throw this.client.transformer.error(
				"No Guild Found for Creating the Channel"
			);

		const request = await this.client.rest
			.endpoint(Endpoints.GUILD_CHANNELS)
			.post<ChannelResolvable>(options, guild.id);
		return new ChannelResolver[request.type](request as never, this.client);
	}

	public delete(id: string, onlyFromCache: boolean = false): boolean {
		if (!onlyFromCache) this.client.rest.endpoint(Endpoints.CHANNEL).delete(id);
		return super.delete(id);
	}
}
