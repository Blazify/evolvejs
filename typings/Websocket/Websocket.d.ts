import WebSocket from "ws";
import { Client } from "..";
export declare class Websocket {
    client: Client;
    ws: WebSocket;
    constructor(client: Client);
    init(token: string): Promise<void>;
}
