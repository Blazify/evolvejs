/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
	User,
	Role,
	Activity,
	Guild,
	ClientStatus,
	IPresenceUpdate,
	EvolveClient,
} from "../..";
import { Objex } from "@evolvejs/objex";

export class PresenceUpdate {
  public user!: User;
  public roles: Objex<string, Role> = new Objex();
  public game!: Activity;
  public guild!: Guild;
  public status!: string;
  public activities!: Array<Activity>;
  public clientStatus!: ClientStatus;
  public premiumFrom?: number | null;
  public nick?: string | null;
  constructor(public data: IPresenceUpdate, private client: EvolveClient) {
  	this._handle();
  }

  private _handle() {
  	if (!this.data) return;
  	this.user = new User(this.data.user);
  	this.data.roles.forEach((o) =>
  		this.roles.set(o, this.client.roles.get(o)!)
  	);
  	if (this.data.game) this.game = new Activity(this.data.game);
  	(async () => {
  		this.guild = await this.client.rest.getGuild(this.data.guild_id);
  	})();
  	this.status = this.data.status;
  	this.activities = this.data.activities;
  	this.clientStatus = new ClientStatus(this.data.client_status);
  	this.premiumFrom = this.data.premium_since;
  	this.nick = this.data.nick;
  	return this;
  }
}
