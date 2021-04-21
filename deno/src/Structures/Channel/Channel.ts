import { EvolveClient } from "../../Client/EvolveClient.ts";
import { CHANNELTYPES } from "../../Utils/Constants.ts";

export class Channel {
 public client!: EvolveClient;
 public id: string;
 public type: CHANNELTYPES;

 constructor(id: string, type: CHANNELTYPES, client: EvolveClient) {
 Object.defineProperty(this, "client", {
 value: client,
 enumerable: false,
 writable: false,
 });
 this.id = id;
 this.type = type;
 }
}
