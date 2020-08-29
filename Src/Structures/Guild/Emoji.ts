import { User } from "../User/User";
import { IEmoji } from "../../Interfaces/EmojiOptions";
import { Role } from "./Role";
import { Objex } from "@evolvejs/objex";

export default class {
    public id!: string | null;
    public name!: string | null;
    public roles: Objex<string, Role> = new Objex();
    public user!: User;
    public reqColons?: boolean;
    public managed?: boolean;
    public animated?: boolean;
    public available?: boolean

    constructor(data: IEmoji) {
        this.id = data.id;
        this.name = data.name
        data.roles?.forEach(i => this.roles.set(i.id, new Role(i)))
        this.user = new User(data.user)
        this.reqColons = data.require_colons
        this.managed = data.managed
        this.animated = data.animated
        this.available = data.available
    }
}
