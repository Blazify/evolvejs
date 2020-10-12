/* eslint-disable no-mixed-spaces-and-tabs */
import { IClientStatus } from "../../";

export class ClientStatus {
  public desktop?: string;
  public mobile?: string;
  public web?: string;
  public data!: IClientStatus;
  constructor(data: IClientStatus) {
    Object.defineProperty(this, "data", {
      value: data,
      enumerable: false,
      writable: false,
    });
    this._handle();
  }

  private _handle() {
    if (!this.data) return;
    this.desktop = this.data.desktop;
    this.mobile = this.data.mobile;
    this.web = this.data.web;
    return this;
  }
}
