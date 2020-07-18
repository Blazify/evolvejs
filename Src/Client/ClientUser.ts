export class ClientUser {
	constructor(
		public name: string,
		public discriminator: string,
		public verfied: boolean,
		public id: string,
		public flags: number,
		public email: string,
		public bot: boolean,
		public avatar: string
	) {}
}
