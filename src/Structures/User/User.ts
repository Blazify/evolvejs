import { IUser } from '../../Interfaces/UserOptions';
import { NITRO } from '../..';

export class User {
	public id: string;
	public username: string;
	public discriminator: string;
	public avatar?: string;
	public bot: boolean;
	public system: boolean;
	public twoFactor: boolean;
	public lang?: string;
	public verified: boolean;
	public email?: string;
	public flags?: number;
	public premiumType: string;
	public publicFlags?: number;

	constructor(data: IUser) {
		this.id = data.id;
		this.username = data.username;
		this.discriminator = data.discriminator;
		this.avatar = data.avatar || undefined;
		this.bot = data.bot || false;
		this.system = data.system || false;
		this.twoFactor = data.mfa_enabled || false;
		this.lang = data.locale;
		this.verified = data.verified || false;
		this.email = data.email || undefined;
		this.flags = data.flags;
		this.premiumType = data.premium_type ? NITRO[data.premium_type] : 'None';
		this.publicFlags = data.public_flags;
	}
}
