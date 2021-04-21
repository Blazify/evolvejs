import { IOverwrite } from "../../Interfaces/OverwriteOptions.ts";

export class Overwrite {
 public id!: string;
 public type!: IOverwrite["type"];
 public allow!: number;
 public deny!: number;
 public data!: IOverwrite;

 constructor(data: IOverwrite) {
 Object.defineProperty(this, "data", {
 value: data,
 enumerable: false,
 writable: false,
 });
 this._handle();
 }

 private _handle() {
 if (!this.data) return;
 this.id = this.data.id;
 this.type = this.data.type;
 this.allow = this.data.allow;
 this.deny = this.data.deny;

 return this;
 }
}
