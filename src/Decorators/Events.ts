import { Objex } from "@evolvejs/objex";
import "reflect-metadata";
import { EvolveClient } from "../Client/EvolveClient";

export const listeners = new Objex<string, EvolveClient>()

export function Event() {
	return (target: EvolveClient, propertyKey: string, propertyDescriptor: PropertyDescriptor): void => {
		if(propertyDescriptor) listeners.set(propertyKey, target);
	};
}