/* eslint-disable @typescript-eslint/no-var-requires */
import ws, { Data } from "ws";
import { EvolveBuilder, CONSTANTS, Payload } from "../..";
import { Gateway } from "./Gateway";

export class EvolveSocket extends ws {
  public seq?: number;
  public gateway: Gateway = new Gateway();

  constructor(public builder: EvolveBuilder, public shard: number) {
  	super(CONSTANTS.Gateway + builder.encoding);
  	this._init();
  }

  public send(data: Payload): void {
	  let payload;
	  if(this.builder.encoding == "json") {
		  payload = JSON.stringify(data);
	  } else if(this.builder.encoding == "etf") {
		  let erlpack;
		  try {
			  erlpack = require("erlpack");
		  } catch(e) {
			  throw this.builder.client.logger.error(e);
		  }
		  payload = erlpack.pack(data);
	  } else {
		  throw this.builder.client.logger.error("Invalid Encoding Type. Only JSON or etf is accepted");
	  }

	  return super.send(payload);
  }

  private _init(): void {
  	try {
  		this.on("error", (err) => {
  			this.builder.client.logger.error(err.message);
  		});

  		this.on("close", (code, res) => {
  			this.builder.client.logger.error(`Code: ${code}, Response: ${res}`);
  		});

  		this.on("message", (data: Data) => {
  			this.gateway.init(data, this, this.shard);
  		});
  		this.onclose = function (err) {
  			this.builder.client.logger.error(err.reason);
  		};
  	} catch (e) {
  		this.builder.client.logger.error(e);
  	}
  }
}
