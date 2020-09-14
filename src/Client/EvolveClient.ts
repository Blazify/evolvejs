import {
	Guild,
	User,
	Emoji,
	Role,
	Message,
	ClientUser,
	ClientOptions,
	RestAPI,
} from "..";
import { Logger } from "sign-logger";
import { Objex } from "@evolvejs/objex";
import { Oauth2 } from "../Oauth2/Oauth2";
import { Structures } from "../Structures/Structures";
import { EvolveSocket } from "./Websocket/Websocket";
import { ChannelTypes } from "../Utils/Constants";
import { EventListener } from "../Utils/EventListener";

export class EvolveClient extends EventListener {
  public token: string;
  public options: ClientOptions;
  public guilds: Objex<string, Guild> = new Objex();
  public channels: Objex<string, ChannelTypes> = new Objex();
  public users: Objex<string, User> = new Objex();
  public emojis: Objex<string | null, Emoji> = new Objex();
  public roles: Objex<string, Role> = new Objex();
  public messages: Objex<string, Message> = new Objex();
  public user!: ClientUser;
  public rest: RestAPI = new RestAPI(this);
  public oauth2!: Oauth2;
  public secret!: string;
  public structures: Structures = new Structures(this);
  public shardConnections: Objex<number, EvolveSocket> = new Objex();
  public logger: Logger = new Logger();
  public sessionID = "";

  public constructor(token: string, options: ClientOptions) {
  	super();
  	this.token = token;
  	this.options = options;
  	if (!this.token) this.logger.error("No token provided");
  }
}
