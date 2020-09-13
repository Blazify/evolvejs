/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IActivityEmoji, IParty, IAssets, ISecrets, IActivity } from "../..";

export class Activity {
  public name!: string;
  public type!: number;
  public createdAt!: number;
  public url?: string | null;
  public startTime?: number;
  public endTime?: number;
  public applicationID?: string;
  public details?: string | null;
  public state?: string | null;
  public emoji?: IActivityEmoji | null;
  public party?: IParty;
  public assets?: IAssets;
  public secrets?: ISecrets;
  public instance?: boolean;
  public flags?: number;

  constructor(public data: IActivity) {
  	this._handle();
  }

  private _handle() {
       if(!this.data) return;
  	this.name = this.data.name;
  	this.type = this.data.type;
  	this.createdAt = this.data.created_at;
  	this.url = this.data.url;
  	this.startTime = this.data.timestamps!.start;
  	this.endTime = this.data.timestamps!.end;
  	this.applicationID = this.data.application_id;
  	this.state = this.data.state;
  	this.details = this.data.details;
  	this.emoji = this.data.emoji;
  	this.party = this.data.party;
  	this.assets = this.data.assets;
  	this.secrets = this.data.secrets;
  	this.instance = this.data.instance;
  	this.flags = this.data.flags;
  	return this;
  }
}
