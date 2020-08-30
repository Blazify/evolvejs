/* eslint-disable no-mixed-spaces-and-tabs */
import { URL } from "url";

export interface IEmbedVideo {
    url: string,
    height: number,
    width: number
}

export class EmbedVideoBuilder {
    private url!: string;
    private height!: number;
    private width!:number;

    public setURL(url: URL): EmbedVideoBuilder {
    	this.url = url.toString();
    	return this;
    }

    public setHeight(height: number): EmbedVideoBuilder {
    	this.height = height;
    	return this;
    }

    public setWidth(width: number): EmbedVideoBuilder {
    	this.width = width;
    	return this;
    }

    public build(): IEmbedVideo {
    	return {
    		url: this.url,
    		height: this.height,
    		width: this.width
    	};
    }
}