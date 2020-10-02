import { URL } from "url.ts";

/* eslint-disable no-mixed-spaces-and-tabs */
export interface IEmbedAuthor {
 name: string;
 url: string;
 icon_url: string;
 proxy_icon_url: string;
}

export class EmbedAuthorBuilder {
 private name!: string;
 private url!: string;
 private iconUrl!: string;
 private proxyiconUrl!: string;

 public setName(name: string): EmbedAuthorBuilder {
 	this.name = name;
 	return this;
 }

 public setURL(url: URL): EmbedAuthorBuilder {
 	this.url = url.toString();
 	return this;
 }

 public setIconURL(url: URL): EmbedAuthorBuilder {
 	this.iconUrl = url.toString();
 	return this;
 }

 public setProxyIconURL(url: URL): EmbedAuthorBuilder {
 	this.proxyiconUrl = url.toString();
 	return this;
 }

 public build(): IEmbedAuthor {
 	return {
 		name: this.name,
 		url: this.url,
 		icon_url: this.iconUrl,
 		proxy_icon_url: this.proxyiconUrl,
 	};
 }
}
