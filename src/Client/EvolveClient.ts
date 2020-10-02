import { Logger, Colors } from "sign-logger.ts";
import { Oauth2 } from "../Oauth2/Oauth2.ts";
import { Structures } from "../Structures/Structures.ts";
import { EventListener } from "../Utils/EventListener.ts";
import { GuildsManager } from "./Managers/GuildsManager.ts";
import { ChannelsManager } from "./Managers/ChannelsManger.ts";
import { UsersManager } from "./Managers/UsersManager.ts";
import { RolesManager } from "./Managers/RolesManager.ts";
import { MessagesManager } from "./Managers/MessagesManager.ts";
import { EmojisManager } from "./Managers/EmojisManager.ts";
import { ClientOptions } from "./ClientOptions.ts";
import { RestAPI } from "./API/RestAPI.ts";
import { ClientUser } from "./ClientUser.ts";
import { ShardManager } from "./Websocket/ShardManager.ts";

export class EvolveClient extends EventListener {
 public token: string;
 public options: ClientOptions;
 public guilds: GuildsManager = new GuildsManager();
 public channels: ChannelsManager = new ChannelsManager(this);
 public users: UsersManager = new UsersManager();
 public emojis: EmojisManager = new EmojisManager();
 public roles: RolesManager = new RolesManager();
 public messages: MessagesManager = new MessagesManager();
 public user!: ClientUser;
 public rest: RestAPI = new RestAPI(this);
 public sharder!: ShardManager;
 public oauth2!: Oauth2;
 public secret!: string;
 public structures: Structures = new Structures(this);
 public logger: Logger = new Logger({
 	dateFormat: "YY:MM:DD:MI:SS:MS",
 	colors: {
 		error: Colors.Red,
 		info: Colors.Blue,
 		success: Colors.Green,
 		debug: Colors.Magenta,
 		warn: Colors.Yellow,
 	},
 	symbols: {
 		left: "<",
 		right: ">",
 	},
 	textColors: {
 		all: false,
 		error: Colors.Red,
 		info: Colors.Blue,
 		success: Colors.Green,
 		debug: Colors.Magenta,
 		warn: Colors.Yellow,
 	},
 });
 public sessionID = "";
 public readyAt!: number;

 public constructor(token: string, options: ClientOptions) {
 	super();
 	this.token = token;
 	this.options = options;
 	this.readyAt = Date.now();
 	if (!this.token) throw this.logger.error("No token provided");
 }

 get uptime(): number {
 	return Date.now() - this.readyAt;
 }
}
