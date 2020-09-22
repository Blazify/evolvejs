/* eslint-disable no-mixed-spaces-and-tabs */
import { Url as URL } from "https://cdn.skypack.dev/url?dts";

export interface IEmbedImage {
  url: string;
  proxy_url: string;
  height: number;
  width: number;
}

export class EmbedImageBuilder {
  private url!: string;
  private proxyURl!: string;
  private height!: number;
  private width!: number;

  public setURL(url: URL): EmbedImageBuilder {
  	this.url = url.toString();
  	return this;
  }

  public setProxyURL(url: URL): EmbedImageBuilder {
  	this.proxyURl = url.toString();
  	return this;
  }

  public setHeight(height: number): EmbedImageBuilder {
  	this.height = height;
  	return this;
  }

  public setWidth(width: number): EmbedImageBuilder {
  	this.width = width;
  	return this;
  }

  public build(): IEmbedImage {
  	return {
  		url: this.url,
  		proxy_url: this.proxyURl,
  		height: this.height,
  		width: this.width,
  	};
  }
}
