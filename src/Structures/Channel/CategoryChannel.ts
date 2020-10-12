/* eslint-disable no-mixed-spaces-and-tabs */

import {
  Overwrite,
  Guild,
  EvolveClient,
  CHANNELTYPES,
  ICategoryChannel,
} from "../..";
import { Objex } from "@evolvejs/objex";
import { Channel } from "./Channel";

export class CategoryChannel extends Channel {
  public overwrites: Objex<string, Overwrite> = new Objex();

  public guild?: Guild;
  public position!: number;
  public name!: string;
  public data!: ICategoryChannel;

  constructor(data: ICategoryChannel, client: EvolveClient) {
    super(data.id, CHANNELTYPES.Category, client);
    Object.defineProperty(this, "data", {
      value: data,
      enumerable: false,
      writable: false,
    });
    this._handle();
  }

  private _handle() {
    if (!this.data) return;
    this.guild = this.client.guilds.get(this.data.guild_id);
    this.position = this.data.position;
    this.name = this.data.name;

    return this;
  }
}
