import Role from './Role';
import User from './User';
export default class {
    private id;
    private name;
    private roles;
    private user;
    private reqColons;
    private managed;
    private animated;
    private available;
    constructor(id: string, name: string, roles: Array<Role['id']>, user: User, reqColons: boolean, managed: boolean, animated: boolean, available: boolean);
}
