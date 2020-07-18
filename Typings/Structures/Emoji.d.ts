import Role from './Role';
import User from './User';
export default class {
    id: string;
    name: string;
    roles: Array<Role['id']>;
    user: User;
    reqColons: boolean;
    managed: boolean;
    animated: boolean;
    available: boolean;
    constructor(id: string, name: string, roles: Array<Role['id']>, user: User, reqColons: boolean, managed: boolean, animated: boolean, available: boolean);
}
