/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IActivityEmoji, IParty, IAssets, ISecrets, IActivity } from "../..";

export class Activity {
	public name: string;
	public type: number;
	public createdAt: number;
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

	constructor(data: IActivity) {
		this.name = data.name;
		this.type = data.type;
		this.createdAt = data.created_at;
		this.url = data.url;
		this.startTime = data.timestamps!.start;
		this.endTime = data.timestamps!.end;
		this.applicationID = data.application_id;
		this.state = data.state;
		this.details = data.details;
		this.emoji = data.emoji;
		this.party = data.party;
		this.assets = data.assets;
		this.secrets = data.secrets;
		this.instance = data.instance;
		this.flags = data.flags;
	}
}
