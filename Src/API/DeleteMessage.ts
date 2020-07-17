import { Client } from '../Client/Client';
import { CONSTANTS } from '../Constants/Constants';
import { IAPIParams } from '../Interfaces/APIParams';
import fetch from 'node-fetch';

export default async function deleteMessage(
	client: Client,
	options: IAPIParams
) {
	await fetch(
		`${CONSTANTS.API}/channels/${options.channelID!}/messages/${options.messageID!}`,
		{
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bot ${client.token}`
			}
		}
	);
}
