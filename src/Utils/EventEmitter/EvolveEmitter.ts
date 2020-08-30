/* eslint-disable no-mixed-spaces-and-tabs */
import { EventEmitter } from "events";
import { EvolveEvents } from "./EvolveEvents";

export class EvolveEmitter extends EventEmitter {
    private listenerArray: Array<EvolveEvents> = []
    constructor() {
    	super();
    }
    
    public addListenerClass(...listeners: EvolveEvents[]): void {
    	for(const listener of listeners) {
    		this.listenerArray.push(listener);
    	}
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public emitEvent(name: string | symbol, ...args: any[]): void {
    	if(!this.listenerArray) {
    		super.emit(name, args);
    		return;
    	}
    	for(const listener of this.listenerArray) {
    		
    		try {
    			super.emit(name, args);
    			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
    		//@ts-ignore
    			listener[name](args);
    		// eslint-disable-next-line no-empty
    		} catch(e) {

    		}
    	}
        
    }
}