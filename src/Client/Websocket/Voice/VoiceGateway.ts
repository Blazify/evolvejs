import { Gateway } from "../Gateway";
import { EventEmitter } from "events";
import ws, { Data } from "ws";
import fetch from "node-fetch";
import { VoiceIdentify } from "../../../Utils/Constants";

export class VoiceGateway extends EventEmitter {
	public link!: string;
	public websocket!: ws;
	constructor(public gateway: Gateway) {
		super();
	}

	public getGateway(): string {
		fetch(this.gateway.voiceServerUpdate.d.channel.endpoint, {
			method: "GET"
		}).then(i => { 
			i.json().then(o => {
				this.link = o;
			});
		});
		return this.link;
	}

	public init(): void {
		this.getGateway();
		this.websocket = new ws(this.link);
		this.websocket.on("message", (data: Data) => {
			this.handle(data);
		});
		VoiceIdentify.d.server_id = this.gateway.voiceServerUpdate.d.server_id;
		VoiceIdentify.d.user_id = this.gateway.voiceStateUpdate.user.id;
		VoiceIdentify.d.session_id = this.gateway.voiceStateUpdate.sessionID;
		VoiceIdentify.d.token = this.gateway.voiceServerUpdate.d.token;

		
		this.websocket.send(JSON.stringify(VoiceIdentify));
	}

	public handle(data: Data):void {
		console.log(data);
	}
}
