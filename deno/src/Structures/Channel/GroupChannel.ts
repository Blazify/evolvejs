import { User, IGroupChannel, EvolveClient, CHANNELTYPES, IUser } from "../../mod.ts";
import { Objex } from "@evolvejs/objex.ts";
import { Channel } from "./Channel.ts";
import { Endpoints } from "../../Utils/Endpoints.ts";

export class GroupChannel extends Channel {
	public recipients: Objex<string, User> = new Objex();

	public name?: string;
	public lastMessage?: string;
	public icon?: string;
	public applicationID?: string;
	public lastPin?: number;
	public data!: IGroupChannel;

	constructor(data: IGroupChannel, client: EvolveClient, public owner?: User) {
		super(data.id, CHANNELTYPES.Group, client);
		Object.defineProperty(this, "data", {
			value: data,
			enumerable: false,
			writable: false,
		});
		this._handle();
	}

	private _handle() {
		if (!this.data) return;

		this.name = this.data.name;
		this.lastMessage = this.data.last_message_id || undefined;
		this.icon = this.data.icon || undefined;
		this.applicationID = this.data.application_id;
		this.lastPin = this.data.last_pin_timestamp;

		return this;
	}

	static async new(data: IGroupChannel, client: EvolveClient) {
		return new GroupChannel(
			data,
			client,
			new User(
				await client.rest.endpoint(Endpoints.USER).get<IUser>(data.owner_id)
			)
		);
	}
}
