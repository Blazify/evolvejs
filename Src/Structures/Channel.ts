import User from './User';
import { CHANNELTYPES } from '../Constants/Constants';
import Guild from './Guild';
import Overwrite from './Overwrite';

export default class {
	constructor(
		private id: string,
		private type: CHANNELTYPES,
		private guild: Guild,
		private position: number,
		private permissionOverwrites: Array<Overwrite>,
		private name: string,
		private topic: string,
		private nsfw: boolean,
		private bitrate: number,
		private userLimit: number,
		private rateLimitPerUser: number,
		private recipients: Array<User>,
		private icon: string,
		private ownerID: string,
		private applicationID: string,
		private parentID: string,
		private lastpinTimestamp: number
	) {}
}
