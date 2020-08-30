import Channel from "./Channel";
import { IDMChannel } from "../../Interfaces/DMChannelOptions";
import { EvolveClient, CHANNELTYPES } from "../..";
import {User} from "../User/User";
import { Objex } from "@evolvejs/objex";

export default class extends Channel {
	public recipients: Objex<string, User> = new Objex();

	public lastMessage?: string;
	public lastPin?: number;

	constructor(data: IDMChannel, client: EvolveClient) {
		super(data.id, CHANNELTYPES.Direct, client);
		this.lastMessage = data.last_message_id || undefined;
		this.lastPin = data.last_pin_timestamp;
	}
}
