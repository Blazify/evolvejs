/* eslint-disable no-mixed-spaces-and-tabs */

import { Objex } from "@evolvejs/objex";
import { Role, User, IEmoji } from "../..";


export class Emoji {
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
    	this.name = data.name;
    	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    	data.roles!.forEach(i => this.roles.set(i.id, new Role(i)));
    	this.user = new User(data.user);
    	this.reqColons = data.require_colons;
    	this.managed = data.managed;
    	this.animated = data.animated;
    	this.available = data.available;
    }
}
