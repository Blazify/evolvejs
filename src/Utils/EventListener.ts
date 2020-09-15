import { Objex } from "@evolvejs/objex";
import { Classes } from "../Structures/Structures";
import { EVENTS } from "./Constants";

export class EventListener {
  private _objListeners: Set<Object> = new Set();
  private _funcListeners: Objex<(...args: any[]) => void, string> = new Objex();


  public addListener(o: Object): void {
  	this._objListeners.add(o);
  }

  public removeListener(o: Object): void {
  	this._objListeners.delete(o);
  }

  public on(name: string, listener: (...args: any[]) => void): void {
  	this._funcListeners.set(listener, name);
  }

  public off(name: string, listener: (...args: any[]) => void): void {
  	const value = this._funcListeners.get(listener);
  	if (value) {
  		if (value === name) {
  			this._funcListeners.delete(listener);
  		}
  	}
  }

  public emit(name: EVENTS, ...args: any[]): void {
  	if (this._objListeners.size !== 0) {
  		for (const listener of this._objListeners) {
  			if(Object.keys(listener).includes(name)) {
  				const func = listener[name as unknown as keyof typeof listener];
  				 if(typeof func !== "function") {
  				 	throw new TypeError(`${func} should be type of function`);
  				 } 
				  Object.call(listener, func)(...args);
  			}
  		}
  	}

  	if (this._funcListeners.size !== 0) {
  		for (const [key, value] of this._funcListeners) {
  			if (value == name) {
  				key(...args);
  			}
  		}
  	}
  }
}
