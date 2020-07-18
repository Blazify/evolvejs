import User from './User';
import { CHANNELTYPES } from '../Constants/Constants';
import Guild from './Guild';
import Overwrite from './Overwrite';

export default class {
	constructor(
		public id: string,
		public type: CHANNELTYPES,
		public guild: Guild,
		public position: number,
		public permissionOverwrites: Array<Overwrite>,
		public name: string,
		public topic: string,
		public nsfw: boolean,
		public bitrate: number,
		public userLimit: number,
		public rateLimitPerUser: number,
		public recipients: Array<User>,
		public icon: string,
		public ownerID: string,
		public applicationID: string,
		public parentID: string,
		public lastpinTimestamp: number
	) {}
}
