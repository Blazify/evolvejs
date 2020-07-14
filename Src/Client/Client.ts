import { EventEmitter } from "events"
import { Websocket, ClientMember, sendMessage, GetGuild } from ".."

export class Client extends EventEmitter {
    private ws: Websocket = new Websocket(this);
    public token: string;
    private _member: ClientMember
    async init(token: string) {
        this.token = token
        if(!token) throw new Error("No Token was Provided")
        this.ws.init(this.token)
    }
    async shutdown() {
        this.ws.ws.close()
        process.exit()
    }
    set member(member: ClientMember) {
        this._member = member
    }
    get member() {
        return this._member;
    }
    async getGuild(guild: string) {
       let data = await GetGuild(this, guild)
    return data;
    }
    async sendMessage(content, channelID, tts = false) { 
       let data = await sendMessage(this, content, channelID, tts)
    return data;
    }
}