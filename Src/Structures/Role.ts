export default class {
	constructor(
		public id: string,
		public name: string,
		public color: number,
		public hoist: boolean,
		public position: number,
		public permissions: number,
		public managed: boolean,
		public mentionable: boolean
	) {}
}
