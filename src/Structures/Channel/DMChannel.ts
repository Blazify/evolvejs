import { User, IDMChannel, EvolveClient, CHANNELTYPES } from "../..";
import { Objex } from "@evolvejs/objex";
import { Channel } from "./Channel";


export class DMChannel extends Channel {
	public recipients: Objex<string, User> = new Objex();

	public lastMessage?: string;
	public lastPin?: number;

	constructor(public data: IDMChannel, client: EvolveClient) {
		super(data.id, CHANNELTYPES.Direct, client);
		this.lastMessage = data.last_message_id || undefined;
		this.lastPin = data.last_pin_timestamp;
	}
}
