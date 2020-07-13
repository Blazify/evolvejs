import { EventEmitter } from "events"
import { Websocket, ClientMember } from ".."
import { GetGuild } from "../API/GetGuild";
import { sendMessage } from "../API/SendMessage";

export class Client extends EventEmitter {
    private ws: Websocket = new Websocket(this);
    public token: string;
    private _member: ClientMember
    async init(token: string) {
        this.token = token
        if(!token) throw new Error("No Token was Provided")
        this.ws.init(this.token)
    }
    set member(member: ClientMember) {
        this._member = member
    }
    get member() {
        return this._member;
    }
    async getGuild(guild: string) {
        await GetGuild(this, guild)
    }
    async sendMessage(content, channelID, tts = false) {
        await sendMessage(this, content, channelID, tts)
    }
}