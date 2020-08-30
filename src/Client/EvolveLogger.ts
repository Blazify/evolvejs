/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import chalk from "chalk";
import moment from "moment";

export class EvolveLogger {
	static async log (content: string, { color = "grey", tag = "Log" } = {}) {
		await EvolveLogger.write(content, {color, tag});
	}
	static async info (content: string, { color = "blueBright", tag = "Info" } = {}) {
		await EvolveLogger.write(content, {color, tag});
	}
	static async warn (content: string, { color = "yellow", tag = "Warn" } = {}) {
		await EvolveLogger.write(content, {color, tag});
	}
	static async error (content: string, { color = "red", tag = "Error" } = {}) {
		await EvolveLogger.write(content, {color, tag, error: true});
		process.exit();
	}
	static async stacktrace (content: string, { color = "white", tag = "Error" } = {}) {
		await EvolveLogger.write(content, {color, tag, error: true});
	}
	static async write(content: string, { color = "grey", tag = "Log", error = false } = {}) {
		const timestamp = chalk.white(`[${moment().format("MM-DD-YYYY HH:mm:ss")}]:`);
		const levelTag = chalk.bold.green(`[${tag}]:`); 
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		const text = chalk[color](content);
		const stream = error ? process.stderr : process.stdout;
		stream.write(chalk.bgBlack`${timestamp} ${levelTag} ${text}\n`);
	}
}