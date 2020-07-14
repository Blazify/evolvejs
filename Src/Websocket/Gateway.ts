import { Payload, Heartbeat, Identify, OPCODE } from "..";
import { Client } from "../Client/Client";
import WebSocket from "ws";

export async function Gateway(data: any, client: Client, token: string, ws: WebSocket) {
    try {
        let payload: Payload = await JSON.parse(data);
        const { t, s, op, d } = payload;
        if(d === null || d === undefined) return;
        const { heartbeat_interval } = d;
        if(op === OPCODE.Hello) {

        setInterval(() => {
            ws.send(JSON.stringify(Heartbeat))
        }, heartbeat_interval)

        Identify.d.token = token;

    ws.send(JSON.stringify(Identify))

    } else if(t) {
        try {
      const { default: module } = await import(`../Events/${t}`)
     await module(client, payload)
    } catch (e) {
        throw new Error(e)
    }
}
    } catch(e) { 
        throw new Error(e)
     }
}