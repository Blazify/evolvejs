import ws from 'ws';
import { Client } from '../Client/Client';
export declare class Websocket {
    client: Client;
    socket: ws;
    constructor(client: Client);
    init(token: string): void;
}
