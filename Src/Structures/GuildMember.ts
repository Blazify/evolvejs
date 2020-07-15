import User from "./User";
import Role from "./Role";

export default class {

    constructor(
        private user: User,
        private nick: string,
        private roles: Array<Role["id"]>,
        private joinedAt: number,
        private premiumFrom: number,
        private deaf: boolean,
        private mute: boolean
    ) {

    }
}