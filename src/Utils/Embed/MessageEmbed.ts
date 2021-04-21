import {
  IEmbedFooter,
  IEmbedImage,
  IEmbedVideo,
  IEmbedProvider,
  IEmbedAuthor,
  IEmbedField,
} from "../..";

export interface MessageEmbed {
  title: string;
  type: string;
  description: string;
  url: string;
  timestamp: number;
  color: number;
  footer: IEmbedFooter;
  image: IEmbedImage;
  thumnail: IEmbedImage;
  video: IEmbedVideo;
  provider: IEmbedProvider;
  author: IEmbedAuthor;
  fields: Array<IEmbedField>;
}
