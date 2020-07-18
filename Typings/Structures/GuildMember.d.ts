import User from './User';
import Role from './Role';
export default class {
    user: User;
    nick: string;
    roles: Array<Role['id']>;
    joinedAt: number;
    premiumFrom: number;
    deaf: boolean;
    mute: boolean;
    constructor(user: User, nick: string, roles: Array<Role['id']>, joinedAt: number, premiumFrom: number, deaf: boolean, mute: boolean);
}
