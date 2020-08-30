/* eslint-disable no-mixed-spaces-and-tabs */
import { IClientStatus } from "../../Interfaces/PresenceUpdateOptions";

export default class {
    public desktop?: string;
    public mobile?: string;
    public web?: string;
    constructor(
    	data: IClientStatus
    ) {
    	this.desktop = data.desktop;
    	this.mobile = data.mobile;
    	this.web = data.web;
    }
}