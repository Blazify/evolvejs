export default class {
	constructor(
		private id: string,
		private name: string,
		private color: number,
		private hoist: boolean,
		private position: number,
		private permissions: number,
		private managed: boolean,
		private mentionable: boolean
	) {}
}
