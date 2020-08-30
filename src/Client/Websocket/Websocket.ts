import ws from "ws";
import { Gateway } from "./Gateway";
import { EvolveBuilder, EvolveLogger, EvolveClient, CONSTANTS } from "../..";


export class EvolveSocket extends ws {
	public seq?: number;
	public gateway: Gateway = new Gateway()

	constructor(
		public client: EvolveClient,
		public builder: EvolveBuilder,
	) {
		super(CONSTANTS.Gateway);
		this.client = client;
	}

	init(): void {
		try {
			this.on("error", (err) => {
				throw Error(err.toString());
			});

			this.on("close", (code, res) => {
				EvolveLogger.error(`Code: ${code}, Response: ${res}`);
			});

			this.on("message", (data) => {
				this.gateway.init(data, this);
			});
			this.onclose = function(err) {
				EvolveLogger.error(err.reason);
			};
		} catch (e) {
			throw Error(e);
		}
	}
}
