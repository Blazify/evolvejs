import { EvolveClient, EVENTS, Payload } from "../../mod.ts";
import { VoiceState } from "../../../Structures/Guild/VoiceState.ts";

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		client.emit(
			EVENTS.VOICE_STATE_UPDATE,
			new VoiceState(payload.d, client),
			shard
		);
	}
}
