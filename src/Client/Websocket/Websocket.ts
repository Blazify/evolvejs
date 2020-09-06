import ws from "ws";
import { EvolveBuilder, CONSTANTS } from "../..";
import { Gateway } from "./Gateway";

export class EvolveSocket extends ws {
  public seq?: number;
  public gateway: Gateway = new Gateway();

  constructor(
    public builder: EvolveBuilder,
    public shard: number
  ) {
  	super(CONSTANTS.Gateway);
  	this.init();
  }

  init(): void {
  	try {
  		this.on("error", (err) => {
  			this.builder.client.logger.error(err.message);
  		});

  		this.on("close", (code, res) => {
  			this.builder.client.logger.error(`Code: ${code}, Response: ${res}`);
  		});

  		this.on("message", (data) => {
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
