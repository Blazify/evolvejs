/* eslint-disable no-mixed-spaces-and-tabs */

import { Role, User, IEmoji } from "../../mod.ts";

export class Emoji {
  public id!: string | null;
  public name!: string | null;
  public roles: Map<string, Role> = new Map();
  public user!: User;
  public reqColons?: boolean;
  public managed?: boolean;
  public animated?: boolean;
  public available?: boolean;

  constructor(public data: IEmoji) {
  	this._handle();
  }

  private _handle() {
  	if (!this.data) return;
  	this.id = this.data.id;
  	this.name = this.data.name;
  	if (this.data.roles)
  		this.data.roles.forEach((i) => this.roles.set(i.id, new Role(i)));
  	this.user = new User(this.data.user);
  	this.reqColons = this.data.require_colons;
  	this.managed = this.data.managed;
  	this.animated = this.data.animated;
  	this.available = this.data.available;
  	return this;
  }
}
