/* eslint-disable @typescript-eslint/no-var-requires */
import ws from "ws.ts";
import { CONSTANTS } from "../../mod.ts";
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
				payload = require("erlpack").pack(data);
			} catch (e) {
				throw this.manager.builder.client.transformer.error(e);
			}
		} else {
			throw this.manager.builder.client.transformer.error(
				"Invalid Encoding Type. Only JSON or etf is accepted"
			);
		}
		return super.send(payload);
	}

	get shardPing(): number {
		return Date.now() - this.gateway.lastPingTimeStamp;
	}

	private _init(): void {
		this.on("error", (err: Error) => {
			throw this.manager.builder.client.transformer.error(err.message);
		});

		this.on("close", (code: number, res: string) => {
			if (code == 4009) {
				this.manager.connections.set(
					this.shard,
					new EvolveSocket(this.manager, this.shard)
				);
				this.gateway.reconnect();
				this.close();
			} else if (code == 4004) {
				throw this.manager.builder.client.transformer.error(
					`Code: ${code}, Response: ${res}\n Destroying Shards and Exitting Process...`
				);
			}
		});

		this.on("message", async (data: string) => {
			await this.gateway.init(data, this);
		});
	}
}
