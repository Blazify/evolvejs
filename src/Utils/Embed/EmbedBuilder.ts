/* eslint-disable no-mixed-spaces-and-tabs */

import { URL } from "url";
import {  IEmbedThumbnail } from "./EmbedThumbnail";
import { IEmbedVideo } from "./EmbedVideo";
import { IEmbedImage } from "./EmbedImage";
import { IEmbedAuthor } from "./EmbedAuthor";
import { IEmbedFooter } from "./EmbedFooter";
import { IEmbedProvider } from "./EmbedProvider";
import { IEmbedField } from "./EmbedField";
import { MessageEmbed } from "./MessageEmbed";

export class EmbedBuilder {
    private title!: string
    private type!: string;
    private description!: string;
    private timestamp!: number;
    private url!: string;
    private color!: number;
    private thumbnail!: IEmbedThumbnail;
    private video!: IEmbedVideo;
    private image!: IEmbedImage;
    private author!: IEmbedAuthor;
    private footer!: IEmbedFooter;
    private provider!: IEmbedProvider;
    private fields: IEmbedField[] = []

    public setTitle(title: string): EmbedBuilder {
    	this.title = title;
    	return this;
    }

    public setType(type: "rich" | "image" | "video" | "gifv" | "article" | "link"): EmbedBuilder {
    	this.type = type;
    	return this;
    }

    public setDescription(description: string): EmbedBuilder {
    	this.description = description;
    	return this;
    }

    public appendDescription(description: string): EmbedBuilder {
    	this.description += description;
    	return this;
    }

    public setTimestamp(timestamp: number): EmbedBuilder {
    	this.timestamp = timestamp;
    	return this;
    }

    public setURL(url: URL): EmbedBuilder {
    	this.url = url.toString();
    	return this;
    }

    public setColor(color: number): EmbedBuilder {
    	this.color = color;
    	return this;
    }

    public setThumbnail(thumbnail: IEmbedThumbnail): EmbedBuilder {
    	this.thumbnail = thumbnail;
    	return this;
    }

    public setVideo(video: IEmbedVideo): EmbedBuilder {
    	this.video = video;
    	return this;
    }

    public setImage(image: IEmbedImage): EmbedBuilder {
    	this.image = image;
    	return this;
    }

    public setAuthor(author: IEmbedAuthor): EmbedBuilder {
    	this.author = author;
    	return this;
    }

    public setFooter(footer: IEmbedFooter): EmbedBuilder {
    	this.footer = footer;
    	return this;
    }

    public setProvider(provider: IEmbedProvider): EmbedBuilder {
    	this.provider = provider;
    	return this;
    }

    public addField(field: IEmbedField): EmbedBuilder {
    	this.fields.push(field);
    	return this;
    }

    public addFields(...fields: IEmbedField[]): EmbedBuilder {
    	for(const field of fields) {
    		this.addField(field);
    	}
        
    	return this;
    }

    public build(): MessageEmbed {
    	return {
    		title: this.title,
    		type: this.type,
    		description: this.description,
    		url: this.url,
    		timestamp: this.timestamp,
    		color: this.color,
    		footer: this.footer,
    		image: this.image,
    		thumnail: this.thumbnail,
    		video: this.video,
    		provider: this.provider,
    		author: this.author,
    		fields: this.fields
    	};
    }
    
}