/* eslint-disable @typescript-eslint/no-var-requires */
import { WebSocket, WebSocketError } from "https://deno.land/x/websocket@v0.0.5/mod.ts";
import { CONSTANTS, Payload } from "../../mod.ts";
import { Gateway } from "./Gateway.ts";
import { ShardManager } from "./ShardManager.ts";

export class EvolveSocket extends WebSocket {
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
		payload = new TextEncoder().encode(data);
  	} else {
  		throw this.manager.builder.client.logger.error(
  			"Invalid Encoding Type. Only JSON or etf is accepted"
  		);
  	}
  	return super.send(payload);
  }

  private _init(): void {
  	try {
  		this.on("error", (err: WebSocketError) => {
  			this.manager.builder.client.logger.error(err.message);
  		});

  		this.on("close", (code: number, res: string) => {
  			this.manager.builder.client.logger.error(
  				`Code: ${code}, Response: ${res}`
  			);
  		});

  		this.on("message", (data: string) => {
  			this.gateway.init(data, this);
  		});
  	} catch (e) {
  		this.manager.builder.client.logger.error(e);
  	}
  }
}
