import { IRole } from "../..";


export class Role {
	public id: string;
		public name: string;
		public color: number;
		public hoist: boolean;
		public position: number;
		public permissions: number;
		public managed: boolean;
		public mentionable: boolean;
	
		constructor(public data: IRole) {
			this.id = data.id;
			this.name = data.name;
			this.color = data.color;
			this.hoist = data.hoist;
			this.position = data.position;
			this.permissions = data.permissions;
			this.managed = data.managed;
			this.mentionable = data.mentionable;
		}
}
