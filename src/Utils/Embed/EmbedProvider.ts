/* eslint-disable no-mixed-spaces-and-tabs */
import { URL } from "url.ts";

export interface IEmbedProvider {
 name: string;
 url: string;
}

export class EmbedProviderBuilder {
 private name!: string;
 private url!: string;

 public setName(name: string): EmbedProviderBuilder {
 	this.name = name;
 	return this;
 }

 public setURL(url: URL): EmbedProviderBuilder {
 	this.url = url.toString();
 	return this;
 }

 public build(): IEmbedProvider {
 	return {
 		name: this.name,
 		url: this.url,
 	};
 }
}
