import User from './User';
import Role from './Role';
export default class {
    private user;
    private nick;
    private roles;
    private joinedAt;
    private premiumFrom;
    private deaf;
    private mute;
    constructor(user: User, nick: string, roles: Array<Role['id']>, joinedAt: number, premiumFrom: number, deaf: boolean, mute: boolean);
}
