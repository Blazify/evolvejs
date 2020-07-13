import { Payload, Heartbeat, Identify, OPCODE } from "..";
import { Client } from "../Client/Client";
import WebSocket from "ws";

export async function Gateway(data: any, client: Client, token: string, websocket: WebSocket) {
    try {
        let payload: Payload = await JSON.parse(data);
        const { t, s, op, d } = payload;
        if(d === null || d === undefined) return;
        const { heartbeat_interval } = d;
        if(op === OPCODE.Hello) {

        setInterval(() => {
            websocket.send(JSON.stringify(Heartbeat))
        }, heartbeat_interval)

        Identify.d.token = token;

    websocket.send(JSON.stringify(Identify))

    } else if(t) {
      const { default: module } = await import(`../Events/${t}`)
     await module(client, payload)
    }
    } catch(e) { 
        throw new Error(e)
     }
}