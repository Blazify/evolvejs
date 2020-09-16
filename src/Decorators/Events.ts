import "reflect-metadata";
import { EvolveClient } from "../Client/EvolveClient";

export function Event() {
	return (target: EvolveClient, propertyKey: string, propertyDescriptor: PropertyDescriptor): void => {
		target.on(propertyKey, args => {
			if(propertyDescriptor.writable) Object.call(target, propertyKey)(args);
		});
	};
}