import { OPCODE } from '../Constants/OpCodes';
export interface Payload {
    op: OPCODE;
    t?: string;
    s?: string;
    d?: any;
}
