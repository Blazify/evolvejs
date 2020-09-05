/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import chalk from "chalk";
import moment from "moment";

export class EvolveLogger {
	static log(content: string, { color = "grey", tag = "Log" } = {}) {
		this.write(content, { color, tag });
	}
	static info(content: string, { color = "blueBright", tag = "Info" } = {}) {
		this.write(content, { color, tag });
	}
	static warn(content: string, { color = "yellow", tag = "Warn" } = {}) {
		this.write(content, { color, tag });
	}
	static error(content: string, { color = "red", tag = "Error" } = {}) {
		this.write(content, { color, tag, error: true });
		process.exit();
	}
	static stacktrace(content: string, { color = "white", tag = "Error" } = {}) {
		this.write(content, { color, tag, error: true });
	}
	static write(
		content: string,
		{ color = "grey", tag = "Log", error = false } = {}
	) {
		const timestamp = chalk.white(
			`[${moment().format("MM-DD-YYYY HH:mm:ss")}]:`
		);
		const levelTag = chalk.bold.green(`[${tag}]:`);
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		const text = chalk[color](content);
		const stream = error ? process.stderr : process.stdout;
		stream.write(chalk.bgBlack`${timestamp} ${levelTag} ${text}\n`);
	}
}
