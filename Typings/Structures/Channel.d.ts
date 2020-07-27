import { CHANNELTYPES, Snowflake } from '../Constants/Constants';
export default class {
    id: string;
    type: CHANNELTYPES;
    constructor(id: Snowflake, type: CHANNELTYPES);
}
