export default class DiscordRejection extends Error {
	raw;
	constructor(struct: {
		msg: string;
		code: number;
		http: number;
		path: string;
	}) {
		super();
		this.name = "DiscordRejection";
		this.message = `API call rejected with status ${struct?.http}. Message: ${struct?.msg}. Endpoint path: ${struct?.path}. Code: ${struct?.code}`;
		this.raw = struct;
	}
}
