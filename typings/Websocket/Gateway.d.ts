import { Client } from "../Client/Client";
import WebSocket from "ws";
export declare function Gateway(data: any, client: Client, token: string, websocket: WebSocket): Promise<void>;
