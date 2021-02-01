import { Transformer } from "sign-logger/dist/Transformer";
import { Oauth2 } from "../Oauth2/Oauth2";
import { Structures } from "../Structures/Structures";
import { EventListener } from "../Utils/EventListener";
import { GuildsManager } from "./Managers/GuildsManager";
import { ChannelsManager } from "./Managers/ChannelsManger";
import { UsersManager } from "./Managers/UsersManager";
import { RolesManager } from "./Managers/RolesManager";
import { MessagesManager } from "./Managers/MessagesManager";
import { EmojisManager } from "./Managers/EmojisManager";
import { ClientOptions } from "./ClientOptions";
import { RestAPI } from "./RestAPI/RestAPI";
import { ClientUser } from "./ClientUser";
import { ShardManager } from "./Websocket/ShardManager";

/**
 * The Client which was given by EvolveBuilder#build
 * @type {EvolveClient}
 * @class
 * @extends {EventListener}
 */
export class EvolveClient extends EventListener {
	/**
	 * The Bot Token
	 * @type {string}
	 */
	public token: string;
	/**
	 * Client Caching Options
	 * @type {ClientOptions}
	 */
	public options: ClientOptions;
	/**
	 * The Guilds and Guilds Cache Managet
	 * @type {GuildsManager}
	 */
	public guilds: GuildsManager = new GuildsManager(this);
	/**
	 * The Channels and Channels Cache Manager
	 * @type {ChannelsManageer}
	 */
	public channels: ChannelsManager = new ChannelsManager(this);
	/**
	 * The Users and UsersCacheManager
	 * @type {UsersManager}
	 */
	public users: UsersManager = new UsersManager();
	/**
	 * The Emojis and Emoji Cache Manager
	 * @type {EmojisManager}
	 */
	public emojis: EmojisManager = new EmojisManager();
	/**
	 * The Roles and Role Cache Manager
	 * @type {RolesManager}
	 */
	public roles: RolesManager = new RolesManager();
	/**
	 * The Messsages and Message Cache Manager
	 * @type {MessagesManager}
	 */
	public messages: MessagesManager = new MessagesManager();
	/**
	 * The Client User Object
	 * @type {ClientUser}
	 */
	public user!: ClientUser;
	/**
	 * The RestAPI Class for handling the Discord Rest Api
	 * @type {RestAPI}
	 * @readonly
	 */
	public readonly rest: RestAPI = new RestAPI(this);
	/**
	 * The sharder/shard manager is used for handling of destroying and launching shards
	 * @type {ShardManager}
	 */
	public sharder!: ShardManager;
	/**
	 * The Discord Oauth2 Handler
	 * @type {Oauth2}
	 */
	public oauth2!: Oauth2;
	/**
	 * The Client Secret for Oauth2
	 * @type {string}
	 */
	public secret!: string;
	/**
	 * The Structures Class
	 * @type {Structures}
	 */
	public structures: Structures = new Structures(this);
	/**
	 * Sign Logger for customized logging
	 * @type {Transformer}
	 */
	public readonly transformer: Transformer = new Transformer();
	/**
	 * The Session ID which was collected in the READY Event
	 * @type {string}
	 */
	public sessionID!: string;
	/**
	 * The Time when the READY Event was fired
	 * @type {number}
	 */
	public readyAt!: number;

	/**
	 * @constructor
	 * @param token
	 * @param options
	 */
	public constructor(token: string, options: ClientOptions) {
		super();
		this.token = token;
		this.options = options;
		if (!this.token) throw this.transformer.error("No token provided");
	}

	get uptime(): number {
		if (!this.readyAt)
			throw this.transformer.error("EvolveClient not ready yet...");
		return Date.now() - this.readyAt;
	}
}
