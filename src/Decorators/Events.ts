import { Objex } from "@evolvejs/objex";
import "reflect-metadata";
import { EvolveClient } from "../Client/EvolveClient";

export const listeners = new Objex<string, EvolveClient>();

export function Event(eventName?: string) {
	return (target: EvolveClient, propertyKey: string, propertyDescriptor: PropertyDescriptor): void => {
		if (propertyDescriptor) {
			if (eventName)
				listeners.set(eventName, target);
			else listeners.set(propertyKey, target);
		}
	};
}