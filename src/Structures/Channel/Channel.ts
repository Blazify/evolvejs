import { EvolveClient, CHANNELTYPES } from "../..";
import { ChannelResolver, ChannelTypes } from "../../Utils/Constants";

export class Channel {
  public client: EvolveClient;
  public id: string;
  public type: CHANNELTYPES;

  constructor(id: string, type: CHANNELTYPES, client: EvolveClient) {
  	this.client = client;
  	this.id = id;
  	this.type = type;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public resolve(data: any): ChannelTypes {
  	return new ChannelResolver[this.type](data, this.client);
  }
}
