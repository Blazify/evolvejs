/* eslint-disable @typescript-eslint/no-var-requires */
import { WebSocket as ws, WebSocketError } from "https://deno.land/x/websocket@v0.0.5/mod.ts";
import { CONSTANTS, Payload } from "../../mod.ts";
import { Gateway } from "./Gateway.ts";
import { ShardManager } from "./ShardManager.ts";

export class EvolveSocket extends ws {
 public seq?: number;
 public gateway: Gateway = new Gateway();

 constructor(public manager: ShardManager, public shard: number) {
 	super(CONSTANTS.Gateway + manager.builder.encoding);
 	this._init();
 }

 public async send(data: any): Promise<void> {
 	let payload;
 	if (this.manager.builder.encoding == "json") {
 		payload = JSON.stringify(data);
 	} else if (this.manager.builder.encoding == "etf") {
 		try {
 			payload = payload = new TextEncoder().encode(data);
 		} catch (e) {
 			throw this.manager.builder.client.logger.error(e);
 		}
 	} else {
 		throw this.manager.builder.client.logger.error(
 			"Invalid Encoding Type. Only JSON or etf is accepted"
 		);
 	}
 	return super.send(payload);
 }

 get shardPing(): number {
 	return Date.now() - this.gateway.lastPingTimeStamp;
 }

 private _init(): void {
 		this.on("error", (err: WebSocketError) => {
 			this.manager.builder.client.logger.error(err.message);
 		});

 		this.on("close", (code: number, res: string) => {
 			this.manager.builder.client.logger.error(
 				`Code: ${code}, Response: ${res}\n Destroying Shards and Exitting Process...`
			 );
			 if(code == 4004) {
 				this.manager.destroyAll();
			 }
 		});

 		this.on("message", (data: string) => {
 			this.gateway.init(data, this);
 		});
 }
}
