import { Client } from '../Client/Client';
import { IAPIParams } from '../Interfaces/APIParams';
import { Objex } from '@evolvejs/objex';
import { APIMethods } from '../Constants/Constants';
export declare class API {
    client: Client;
    methods: Objex<string, Function>;
    constructor(client: Client);
    request(method: APIMethods, params: IAPIParams): Promise<any>;
}
