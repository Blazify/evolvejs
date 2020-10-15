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
    this.message = `API call rejected with status ${struct?.http}. Message: \u001b[31;1m${struct?.msg}.\u001b[0m Endpoint path: \u001b[31;1m${struct?.path}. Code: ${struct?.code}`;
    this.raw = struct;
  }
}
