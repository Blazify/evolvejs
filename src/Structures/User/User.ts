import { IUser, NITRO } from "../..";

export class User {
  public id!: string;
  public username!: string;
  public discriminator!: string;
  public avatar?: string;
  public bot!: boolean;
  public system!: boolean;
  public twoFactor!: boolean;
  public lang?: string;
  public verified!: boolean;
  public email?: string;
  public flags?: number;
  public premiumType!: string;
  public publicFlags?: number;

  constructor(public data: IUser) {
  	this._handle();
  }

  private _handle() {
  	if (!this.data) return;
  	if (this.data.id) this.id = this.data.id;
  	this.username = this.data.username;
  	this.discriminator = this.data.discriminator;
  	this.avatar = this.data.avatar || undefined;
  	this.bot = this.data.bot || false;
  	this.system = this.data.system || false;
  	this.twoFactor = this.data.mfa_enabled || false;
  	this.lang = this.data.locale;
  	this.verified = this.data.verified || false;
  	this.email = this.data.email || undefined;
  	this.flags = this.data.flags;
  	this.premiumType = this.data.premium_type
  		? NITRO[this.data.premium_type]
  		: "None";
  	this.publicFlags = this.data.public_flags;
  	return this;
  }
}
