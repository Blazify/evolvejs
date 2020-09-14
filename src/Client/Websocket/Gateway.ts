/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-mixed-spaces-and-tabs */
import { EvolveSocket } from "./Websocket";
import { OPCODE, Heartbeat, Identify, VoiceStateUpdate } from "../..";
import { Payload } from "../../Interfaces/Interfaces";
import { Data } from "ws";
import { VoiceGateway } from "./Voice/VoiceGateway";
import { EVENTS } from "../../Utils/Constants";
import { VoiceState } from "../../Structures/Guild/VoiceState";
import { EventListener } from "../../Utils/EventListener";

export class Gateway extends EventListener {
  public data!: Data;
  public ws!: EvolveSocket;
  public launchedShards: Set<number> = new Set();
  public voice!: VoiceGateway;
  public voiceStateUpdate!: VoiceState;
  public voiceServerUpdate!: Payload;
  public shard!: number;

  public init(data: Data, ws: EvolveSocket, shard: number): void {
  	this.data = data;
  	this.ws = ws;
  	this.shard = shard;

  	try {
  		const payload: Payload = JSON.parse(this.data.toString());
  		const { op, t, d } = payload;
  		if (!d) return;

  		if (op === OPCODE.Hello) {
  			// Command: Heartbeat
  			setInterval(() => {
  				this.ws.send(Heartbeat);
  			}, d.heartbeat_interval);

  			this._spawn(shard);
  		} else if (op === OPCODE.Reconnect) {
  			this.ws.builder.client.shardConnections.clear();
  			this.ws.builder.client.shardConnections.set(shard, new EvolveSocket(this.ws.builder, shard));
			  this._reconnect();
			  this.ws.close();

  		} else if (t) {
			  this.ws.builder.client.emit("raw", ({
				  t,
				  payload,
				  shard
			  }));
  			try {
  				(async () => {
  					const { default: handler } = await import(`./Handlers/${t}`);
  					new handler(this.ws.builder.client, payload, shard);
  				})();
  			} catch (e) {
  				this.ws.builder.client.logger.error(e);
  			}
  		}
  	} catch (e) {
  		this.ws.builder.client.logger.error(e);
  	}
  }

  private _spawn(shard: number): void {
  	Identify.d.token = this.ws.builder.client.token;
  	Identify.d.activity = this.ws.builder.activity;
  	Identify.d.shard = [shard, this.ws.builder.shards];
  	Identify.d.intents = this.ws.builder.intents;

  	if (this._debug(shard)) {
  		this.ws.send(Identify);
  	}
  }

  private _debug(shard: number): boolean {
	  if(this.ws.builder.client.shardConnections.has(shard)) return false;
  	this.emit("shardSpawn", shard);
  	return true;
  }

  private _reconnect() {
  	const payload: Payload = {
  		op: OPCODE.Resume,
  		d: {
  			token: this.ws.builder.client.token,
  			session_id: this.ws.builder.client.sessionID,
  			seq: this.ws.seq,
  		},
  	};
  	this.ws.send(payload);
  }

  public sendVoiceStateUpdate(
  	guildID: string,
  	channelID: string,
  	options?: {
      self_deaf: boolean;
      self_mute: boolean;
    },
  	initialize = false
  ): void {
  	VoiceStateUpdate.d.guild_id = guildID;
  	VoiceStateUpdate.d.channel_id = channelID;
  	if (options) {
  		VoiceStateUpdate.d.self_deaf = options.self_deaf;
  		VoiceStateUpdate.d.self_mute = options.self_mute;
  	}

  	this.ws.send(VoiceStateUpdate);

  	this.ws.builder.client.on(EVENTS.VOICE_STATE_UPDATE, (pk) => {
  		if (pk.member.user.id !== this.ws.builder.client.user.id) return;
  		this.voiceStateUpdate = pk;
  		if (this.voiceStateUpdate && this.voiceServerUpdate && !this.voice) {
  			this.voice = new VoiceGateway(this);
  			this.voice.emit(
  				"packetReady",
  				(this.voiceStateUpdate, this.voiceServerUpdate)
  			);
  			if (initialize) this.voice.init();
  		}
  	});

  	this.ws.builder.client.on(EVENTS.VOICE_SERVER_UPDATE, (pk) => {
  		this.voiceServerUpdate = pk;
  		if (this.voiceStateUpdate && this.voiceServerUpdate && !this.voice) {
  			this.voice = new VoiceGateway(this);
  			this.voice.emit(
  				"packetReady",
  				(this.voiceStateUpdate, this.voiceServerUpdate, this.shard)
  			);
  			if (initialize) this.voice.init();
  		}
  	});
  }
}
