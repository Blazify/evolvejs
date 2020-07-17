import { Client } from '../Client/Client';
import { IAPIParams } from '../Interfaces/APIParams';
import { APIMethods } from '../Constants/Constants';
export declare class API {
    private client;
    private methods;
    constructor(client: Client);
    request(method: APIMethods, params: IAPIParams): Promise<any>;
}
