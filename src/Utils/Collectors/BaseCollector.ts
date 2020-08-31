/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/ban-types */
import { EvolveClient, EvolveEmitter, Message } from "../../";
import { Objex } from "@evolvejs/objex";

export class BaseCollector extends EvolveEmitter {
    private _collected: Objex<string, Message> = new Objex()
    constructor(
        public client: EvolveClient,
        public filter: Function
    ) {
    	super();
    }
    
    get collected(): Objex<string, Message> {
    	return this._collected;
    }
}