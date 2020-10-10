import { Objex } from "@evolvejs/objex";
import { listeners } from "../Decorators/Events";
import { EVENTS } from "./Constants";

export class EventListener {
	private _objListeners: Set<Object> = new Set();
	private _funcListeners = new Objex<(...args: unknown[]) => void, string>();

	public listenerCount(eventName: string) {
		return this._funcListeners.filter((name: string) => name === eventName)
			.size;
	}

	public addListener(o: Object): void {
		this._objListeners.add(o);
	}

	public removeListener(o: Object): void {
		this._objListeners.delete(o);
	}

	public removeAllListeners(): void {
		this._funcListeners.clear();
		this._objListeners.clear();
		listeners.clear();
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
				if (Object.keys(listener).includes(name)) {
					const func = listener[(name as unknown) as keyof typeof listener];
					if (typeof func !== "function") {
						throw new TypeError(`${func} should be type of function`);
					}
					Object.call(listener, func)(...args);
				}
			}
		}

		if (listeners) {
			for (const [k, v] of listeners) {
				if (k[0] === name) {
					try {
						const func = v[(k[1] as unknown) as keyof typeof v];
						Object.call(v, func)(...args);
					} catch (e) {
						v.logger.error(e);
					}
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
