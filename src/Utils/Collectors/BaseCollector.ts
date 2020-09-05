/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/ban-types */
import { EvolveClient, Message } from "../../";
import { Objex } from "@evolvejs/objex";
import { MessageReaction } from "../../Structures/Message/MessageReaction";
import { EventEmitter } from "events";

export class BaseCollector extends EventEmitter {
  private _collected: Objex<string, Message | MessageReaction> = new Objex();
  constructor(public client: EvolveClient, public filter: Function) {
  	super();
  }

  get collected(): Objex<string, Message | MessageReaction> {
  	return this._collected;
  }
}
