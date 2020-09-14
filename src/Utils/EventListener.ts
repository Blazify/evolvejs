import { Objex } from "@evolvejs/objex"


export class EventListener {
    private _objListeners: Set<Object> = new Set()
    private _funcListeners: Objex<(...args: any[]) => void, string> = new Objex();

    constructor() {}

    public addListener(o: Object): void {
        this._objListeners.add(o)
    }

    public removeListener(o: Object): void {
        this._objListeners.delete(o)
    }

    public on(name: string, listener: (...args: any[]) => void): void {
        this._funcListeners.set(listener, name)
    }

    public off(name: string, listener: (...args: any[]) => void) {
        const value = this._funcListeners.get(listener)
        if(value) {
            if(value === name) {
                this._funcListeners.delete(listener)
            }
        }
    }

    public emit(name: string, ...args: any[]): void {
        if(this._objListeners.size > 0) {
            for(const listener of this._objListeners) {
                if(listener.hasOwnProperty(name)) {
                    //@ts-ignore
                    listener[name](args)
                }
            }
        }

        if(this._funcListeners.size > 0) {
            for(const [key, value] of this._funcListeners) {
                if(value == name) {
                    key(args)
                }
            }
        }
    }
}