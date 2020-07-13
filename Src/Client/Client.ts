import { EventEmitter } from "events"
import { Websocket } from ".."
export class Client extends EventEmitter {
    private ws: Websocket = new Websocket(this);
    async init(token: string) {
        this.ws.init(token)
    }
}