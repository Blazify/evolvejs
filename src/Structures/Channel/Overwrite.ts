import { IOverwrite } from "../../Interfaces/OverwriteOptions";

export default class {
	public id: string;
	public type: IOverwrite["type"];
	public allow: number;
	public deny: number;

	constructor(data: IOverwrite) {
		this.id = data.id;
		this.type = data.type;
		this.allow = data.allow;
		this.deny = data.deny;
	}
}
