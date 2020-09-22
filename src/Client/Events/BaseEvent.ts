import { EvolveClient } from "../EvolveClient.ts";
import { EvolveSocket } from "../Websocket/Websocket.ts";

export class BaseEvent {
	constructor(private _shard: number, private _client: EvolveClient) {}

	get shard(): EvolveSocket {
		const shardConnection = this._client.sharder.connections.get(this._shard);
		if (!shardConnection) {
			throw this.client.logger.error(
				"Internal Error (Shard Websocket Not Found)"
			);
		}
		return shardConnection;
	}

	get client(): EvolveClient {
		return this._client;
	}
}
