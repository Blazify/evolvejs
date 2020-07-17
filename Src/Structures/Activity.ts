import Emoji from './Emoji';
import TimeStamps from './TimeStamps';
import Party from './Party';
import Assets from './Assets';
import Secrets from './Secrets';

export default class {
	constructor(
		private name: string,
		private type: number,
		private url: string,
		private createdAt: number,
		private timeStamp: TimeStamps,
		private applicationID: string,
		private details: string,
		private emoji: Emoji,
		private party: Party,
		private assets: Assets,
		private secrets: Secrets,
		private instance: boolean,
		private flags: number
	) {}
}
