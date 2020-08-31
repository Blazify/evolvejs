import { User, Role, Activity, Guild, ClientStatus, IPresenceUpdate, EvolveClient } from "../..";
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
		constructor(
			data: IPresenceUpdate,
			client: EvolveClient
		) {
			this.user = new User(data.user);
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			data.roles.forEach(o => this.roles.set(o, client.roles.get(o)!));
		data.game?.forEach(o => this.game = new Activity(o));
		client.api.getGuild(data.guild_id).then(o => this.guild = o);
		this.status = data.status;
		this.activities = data.activities;
		this.clientStatus = new ClientStatus(data.client_status);
		this.premiumFrom = data.premium_since;
		this.nick = data.nick;
		}
}
