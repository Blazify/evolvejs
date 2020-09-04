/* eslint-disable no-mixed-spaces-and-tabs */
import { IClientStatus } from "../../";

export class ClientStatus {
    public desktop?: string;
    public mobile?: string;
    public web?: string;
    constructor(
    	public data: IClientStatus
    ) {
    	this.desktop = data.desktop;
    	this.mobile = data.mobile;
    	this.web = data.web;
    }
}