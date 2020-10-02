/* eslint-disable no-mixed-spaces-and-tabs */
import { URL } from "url.ts";

export interface IEmbedThumbnail {
 url: string;
 proxy_url: string;
 height: number;
 width: number;
}

export class EmbedThumbnailBuilder {
 private url!: string;
 private proxy_url!: string;
 private height!: number;
 private width!: number;

 public setURL(url: URL): EmbedThumbnailBuilder {
 	this.url = url.toString();
 	return this;
 }

 public setProxyURL(url: URL): EmbedThumbnailBuilder {
 	this.proxy_url = url.toString();
 	return this;
 }

 public setHeight(height: number): EmbedThumbnailBuilder {
 	this.height = height;
 	return this;
 }

 public setWidth(width: number): EmbedThumbnailBuilder {
 	this.width = width;
 	return this;
 }

 public build(): IEmbedThumbnail {
 	const thumbnail: IEmbedThumbnail = {
 		url: this.url,
 		proxy_url: this.proxy_url,
 		height: this.height,
 		width: this.width,
 	};

 	return thumbnail;
 }
}
