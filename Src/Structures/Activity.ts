import Emoji from './Emoji';
import TimeStamps from './TimeStamps';
import Party from './Party';
import Assets from './Assets';
import Secrets from './Secrets';

export default class {
	constructor(
		public name: string,
		public type: number,
		public url: string,
		public createdAt: number,
		public timeStamp: TimeStamps,
		public applicationID: string,
		public details: string,
		public emoji: Emoji,
		public party: Party,
		public assets: Assets,
		public secrets: Secrets,
		public instance: boolean,
		public flags: number
	) {}
}
