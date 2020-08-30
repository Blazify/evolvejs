import { IEmbedFooter } from "./EmbedFooter";
import { IEmbedImage } from "./EmbedImage";
import { IEmbedVideo } from "./EmbedVideo";
import { IEmbedProvider } from "./EmbedProvider";
import { IEmbedAuthor } from "./EmbedAuthor";
import { IEmbedField } from "./EmbedField";

export interface MessageEmbed {
    title: string,
    type: string,
    description: string,
    url: string,
    timestamp: number,
    color: number,
    footer: IEmbedFooter,
    image: IEmbedImage,
    thumnail: IEmbedImage,
    video: IEmbedVideo,
    provider: IEmbedProvider,
    author: IEmbedAuthor,
    fields: Array<IEmbedField>
}