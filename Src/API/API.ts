import { Client } from '../Client/Client';
import { IAPIParams } from '../Interfaces/APIParams';
import { readdirSync } from 'fs';
import { Objex } from '@evolvejs/objex';
import { APIMethods } from '../Constants/Constants';

export class API {
	private client: Client;
	private methods: Objex<string, Function> = new Objex();

	constructor(client: Client) {
		this.client = client;

		const actions = readdirSync(__dirname + '/')
			.filter((x) => x.endsWith('.js') && !x.includes('API'))
			.map((x) => x.split('.')[0]);

		for (let action of actions) {
			const { default: pull } = require(`./${action}.js`);
			this.methods.set(action, pull);
		}
	}

	public async request(method: APIMethods, params: IAPIParams) {
		const callFunc = this.methods.get(method);
		return await callFunc!(this.client, params);
	}
}
