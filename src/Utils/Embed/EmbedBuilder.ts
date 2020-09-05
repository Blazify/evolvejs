/* eslint-disable no-mixed-spaces-and-tabs */

import { URL } from "url";
import {
	IEmbedThumbnail,
	IEmbedVideo,
	IEmbedImage,
	IEmbedAuthor,
	IEmbedFooter,
	IEmbedProvider,
	IEmbedField,
	EmbedThumbnailBuilder,
	EmbedVideoBuilder,
	EmbedImageBuilder,
	EmbedAuthorBuilder,
	EmbedFooterBuilder,
	EmbedProviderBuilder,
	EmbedFieldBuilder,
	MessageEmbed,
} from "../..";

export class EmbedBuilder {
  private title!: string;
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
  private fields: IEmbedField[] = [];

  public setTitle(title: string): EmbedBuilder {
  	this.title = title;
  	return this;
  }

  public setType(
  	type: "rich" | "image" | "video" | "gifv" | "article" | "link"
  ): EmbedBuilder {
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

  public setThumbnail(
  	url: URL,
  	proxyURL?: URL,
  	height?: number,
  	width?: number
  ): EmbedBuilder {
  	const thumbnail = new EmbedThumbnailBuilder();
  	if (url) thumbnail.setURL(url);
  	if (proxyURL) thumbnail.setProxyURL(proxyURL);
  	if (height) thumbnail.setHeight(height);
  	if (width) thumbnail.setWidth(width);

  	this.thumbnail = thumbnail.build();
  	return this;
  }

  public setVideo(url: URL, height?: number, width?: number): EmbedBuilder {
  	const video = new EmbedVideoBuilder();
  	if (url) video.setURL(url);
  	if (height) video.setHeight(height);
  	if (width) video.setWidth(width);

  	this.video = video.build();
  	return this;
  }

  public setImage(
  	url: URL,
  	proxyURL?: string,
  	height?: number,
  	width?: number
  ): EmbedBuilder {
  	const image = new EmbedImageBuilder();
  	if (url) image.setURL(url);
  	if (proxyURL) image.setProxyURL(url);
  	if (height) image.setHeight(height);
  	if (width) image.setWidth(width);

  	this.image = image.build();
  	return this;
  }

  public setAuthor(
  	text?: string,
  	url?: URL,
  	iconURL?: URL,
  	proxyIconURL?: URL
  ): EmbedBuilder {
  	const author = new EmbedAuthorBuilder();
  	if (text) author.setName(text);
  	if (url) author.setURL(url);
  	if (iconURL) author.setIconURL(iconURL);
  	if (proxyIconURL) author.setProxyIconURL(proxyIconURL);

  	this.author = author.build();
  	return this;
  }

  public setFooter(text?: string, url?: URL, proxyURL?: URL): EmbedBuilder {
  	const footer = new EmbedFooterBuilder();
  	if (text) footer.setText(text);
  	if (url) footer.setIconUrl(url);
  	if (proxyURL) footer.setProxyIconUrl(proxyURL);

  	this.footer = footer.build();
  	return this;
  }

  public setProvider(name?: string, url?: URL): EmbedBuilder {
  	const provider = new EmbedProviderBuilder();
  	if (name) provider.setName(name);
  	if (url) provider.setURL(url);

  	this.provider = provider.build();
  	return this;
  }

  public addField(key: string, value: string, inline = false): EmbedBuilder {
  	const field: IEmbedField = new EmbedFieldBuilder()
  		.setName(key)
  		.setValue(value)
  		.enableInline(inline)
  		.build();
  	this.fields.push(field);
  	return this;
  }

  public addFields(
  	...fields: { key: string; value: string; inline?: boolean }[]
  ): EmbedBuilder {
  	for (const field of fields) {
  		this.addField(field.key, field.value, field.inline);
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
  		fields: this.fields,
  	};
  }
}
