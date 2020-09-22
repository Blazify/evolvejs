/* eslint-disable @typescript-eslint/no-var-requires */
import ws, { Data } from "ws";
import { CONSTANTS, Payload } from "../..";
import { Gateway } from "./Gateway";
import { ShardManager } from "./ShardManager";

export class EvolveSocket extends ws {
  public seq?: number;
  public gateway: Gateway = new Gateway();

  constructor(public manager: ShardManager, public shard: number) {
  	super(CONSTANTS.Gateway + manager.builder.encoding);
  	this._init();
  }

  public send(data: Payload): void {
  	let payload;
  	if (this.manager.builder.encoding == "json") {
  		payload = JSON.stringify(data);
  	} else if (this.manager.builder.encoding == "etf") {
  		let erlpack;
  		try {
  			erlpack = require("erlpack");
  		} catch (e) {
  			throw this.manager.builder.client.logger.error(e);
  		}
  		payload = erlpack.pack(data);
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
  	try {
  		this.on("error", (err) => {
  			this.manager.builder.client.logger.error(err.message);
  		});

  		this.on("close", (code, res) => {
  			this.manager.builder.client.logger.error(
  				`Code: ${code}, Response: ${res}`
  			);
  		});

  		this.on("message", (data: Data) => {
  			this.gateway.init(data, this);
  		});
  	} catch (e) {
  		this.manager.builder.client.logger.error(e);
  	}
  }
}
