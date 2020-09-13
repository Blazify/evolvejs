import { IRole } from "../..";

export class Role {
  public id!: string;
  public name!: string;
  public color!: number;
  public hoist = false;
  public position!: number;
  public permissions!: number;
  public managed = false;
  public mentionable = false;

  constructor(public data: IRole) {
  	this._handle();
  }

  private _handle() {
<<<<<<< HEAD
  	if(!this.data) return;
=======
       if(!this.data) return;
>>>>>>> b859af299254f7553c2530743ab846a13638de61
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
