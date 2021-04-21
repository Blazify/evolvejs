/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/ban-types */
import { EvolveClient, Message } from "../../.ts";
import { Objex } from "@evolvejs/objex.ts";
import { MessageReaction } from "../../Structures/Message/MessageReaction.ts";
import { EventListener } from "../EventListener.ts";

export class BaseCollector extends EventListener {
 public listener!: (...args: any[]) => void;

 private _collected: Objex<string, Message | MessageReaction> = new Objex();
 constructor(public client: EvolveClient, public filter: Function) {
 super();
 }

 get collected(): Objex<string, Message | MessageReaction> {
 return this._collected;
 }
}
