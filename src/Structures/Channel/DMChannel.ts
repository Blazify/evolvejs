import { User, IDMChannel, EvolveClient, CHANNELTYPES } from "../../mod.ts";
import { Channel } from "./Channel.ts";

export class DMChannel extends Channel {
  public recipients: Map<string, User> = new Map();

  public lastMessage?: string;
  public lastPin?: number;

  constructor(public data: IDMChannel, client: EvolveClient) {
  	super(data.id, CHANNELTYPES.Direct, client);
  	this._handle();
  }

  private _handle() {
  	if (!this.data) return;
  	this.lastMessage = this.data.last_message_id || undefined;
  	this.lastPin = this.data.last_pin_timestamp;

  	return this;
  }
}
