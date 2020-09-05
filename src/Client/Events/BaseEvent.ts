import { EvolveClient } from "../EvolveClient";
import { EvolveSocket } from "../Websocket/Websocket";

export class BaseEvent {
	constructor(private _shard: number, private client: EvolveClient) {}

	get shard(): EvolveSocket | undefined {
		const shardConnection = this.client.shardConnections.get(this._shard);
		if (!shardConnection) {
			this.client.logger.error("Internal Error (Shard Websocket Not Found)");
			return undefined;
		}
		return shardConnection;
	}
}
