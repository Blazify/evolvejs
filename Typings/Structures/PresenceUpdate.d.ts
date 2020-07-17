import User from './User';
import Role from './Role';
import Guild from './Guild';
import ClientStatus from './ClientStatus';
import Activity from './Activity';
export default class {
    private user;
    private roles;
    private game;
    private guild;
    private status;
    private activities;
    private clientStatus;
    private premiumFrom;
    private nick;
    constructor(user: User, roles: Array<Role['id']>, game: Activity, guild: Guild, status: string, activities: Array<Activity>, clientStatus: ClientStatus, premiumFrom: number, nick: string);
}
