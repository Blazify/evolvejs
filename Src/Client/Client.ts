import { EventEmitter } from "events"
import { Websocket, ClientUser, sendMessage, GetGuild } from ".."

export class Client extends EventEmitter {
    private ws: Websocket = new Websocket(this);
    public token: string;
    private _user: ClientUser
    async init(token: string) {
        this.token = token
        if(!token) throw new Error("No Token was Provided")
        this.ws.init(this.token)
    }
    async shutdown() {
        this.ws.ws.close()
        process.exit()
    }
    set user(user: ClientUser) {
        this._user = user
    }
    get member() {
        return this._user;
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