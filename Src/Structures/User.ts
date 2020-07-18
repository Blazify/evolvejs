export default class {
	constructor(
		public id: string,
		public name: string,
		public discriminator: string,
		public avatar: string,
		public bot: boolean,
		public system: boolean,
		public mfaEnabled: boolean,
		public locale: string,
		public verified: boolean,
		public email: string,
		public flags: number,
		public premiumType: number,
		public publicFlags: number
	) {}
}
