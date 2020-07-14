import WebSocket from "ws"
import { Client } from "..";
import { Gateway } from "./Gateway";
import { Constants } from "../Constants/Constants";

export class Websocket {
    public ws: WebSocket;
    constructor(public client: Client) {
      this.client = client
    }
    async init(token: string) {
    try {
        this.ws = new WebSocket(Constants.GATEWAY)
        this.ws.on('message', async (data) => {
          return await Gateway(data, this.client, token, this.ws);
          });
    } catch (e) {
         throw new Error(e)
    }
}
}