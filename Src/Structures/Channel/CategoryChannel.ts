import Channel from "./Channel";
import { ICategoryChannel } from "../../Interfaces/CategoryChannelOptions";
import Overwrite from "./Overwrite";
import { EvolveClient, CHANNELTYPES } from "../..";
import { Guild } from "../Guild/Guild";
import { Objex } from "@evolvejs/objex";

export default class extends Channel {
    public overwrites: Objex<string, Overwrite> = new Objex();

    public guild: Guild;
    public position: number;
    public name: string;

    constructor(data: ICategoryChannel, client: EvolveClient) {
        super(data.id, CHANNELTYPES.Category, client);
        this.guild = this.client.guilds.get(data.guild_id)!;
        this.position = data.position;
        this.name = data.name;
    }
}
