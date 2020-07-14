import { EventEmitter } from "events"
import { Websocket, ClientUser, sendMessage, GetGuild } from ".."
import { deleteMessage } from "../API/DeleteMessage";
import { banAdd } from "../API/BanAdd";
import { banRemove } from "../API/BanRemove";

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
       return await GetGuild(this, guild)
    }


    async sendMessage(content, channelID, tts = false) { 
       return await sendMessage(this, content, channelID, tts)
    }

    async deleteMessage(messageID: string, channelID: string) {
        return await deleteMessage(this, channelID, messageID)
    }

    async banAdd(userID: string, guildID: string) {
        return await banAdd(this, guildID, userID)
    }

    async banRemove(userID: string, guildID: string) {
        return await banRemove(this, guildID, userID)
    }
}