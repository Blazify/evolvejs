import User from './User';
import { Snowflake } from '../Constants/Constants';
export default class {
    id: Snowflake;
    name: string;
    roles: Snowflake[];
    user: User;
    reqColons: boolean;
    managed: boolean;
    animated: boolean;
    available: boolean;
    constructor(id: Snowflake, name: string, roles: Snowflake[], user: User, reqColons: boolean, managed: boolean, animated: boolean, available: boolean);
}
