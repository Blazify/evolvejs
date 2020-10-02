import { Objex } from "@evolvejs/objex.ts";
import { EvolveClient } from "../Client/EvolveClient.ts";

export const listeners = new Objex<Array<string>, EvolveClient>();

export function Event(eventName?: string) {
	return (
		target: EvolveClient,
		propertyKey: string,
		propertyDescriptor: PropertyDescriptor
	): void => {
		if (propertyDescriptor.writable)
			listeners.set([eventName ?? propertyKey, propertyKey], target);
	};
}
