import { IRole } from "../../mod.ts";

export class Role {
 public id!: string;
 public name!: string;
 public color!: number;
 public hoist = false;
 public position!: number;
 public permissions!: number;
 public managed = false;
 public mentionable = false;
 public data!: IRole;

 constructor(data: IRole) {
 	Object.defineProperty(this, "data", {
 		value: data,
 		enumerable: false,
 		writable: false,
 	});
 	this._handle();
 }

 private _handle() {
 	if (!this.data) return;
 	this.id = this.data.id;
 	this.name = this.data.name;
 	this.color = this.data.color;
 	this.hoist = this.data.hoist;
 	this.position = this.data.position;
 	this.permissions = this.data.permissions;
 	this.managed = this.data.managed;
 	this.mentionable = this.data.mentionable;
 	return this;
 }
}
