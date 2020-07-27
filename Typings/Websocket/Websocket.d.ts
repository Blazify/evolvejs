import ws from 'ws';
import { Client } from '../Client/Client';
export declare class EvolveSocket extends ws {
    client: Client;
    seq?: number;
    constructor(client: Client);
    init(): void;
}
