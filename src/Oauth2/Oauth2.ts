import { EvolveClient } from "../Client/EvolveClient";
import { TokenAccessOptions, CONSTANTS } from "..";
import { EvolveLogger } from "../Client/EvolveLogger";


export class Oauth2 {
	constructor(
        public client: EvolveClient
	) {
		if(!this.client.secret) EvolveLogger.error("No secret provided in builder");
	}
    
	public async requestOauth2Token(options: TokenAccessOptions): Promise<JSON> {
		let string = "";
		for (const [key, value] of Object.entries({
			client_id: this.client.user.id,
			client_secret: this.client.secret,
			grant_type: "authorization_code",
			code: options.code,
			redirect_uri: options.redirectUri,
			scope: options.scopes
		})) {
			if (!value) continue;
			string += `&${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
		}

		const fetched = await fetch(`${CONSTANTS.Api}/oauth2/token`, {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			method: "POST",
			body: string.substring(1)
		});


		return await fetched.json();
	}
    
	public async requestTokenExchange(refreshToken: string, redirectURI: string, scopes: string): Promise<JSON> {
		let string = "";
		for(const [k, v] of Object.entries({
			"client_id": this.client.user.id,
			"client_secret": this.client.secret,
			"grant_type": "refresh_token",
			"refresh_token": refreshToken,
			"redirect_uri": redirectURI,
			"scope": scopes           
		})) {
			if(!v) continue;
			string += `&${encodeURIComponent(k)}=${encodeURIComponent(v)}`;
		}

		const fetched = await fetch(`${CONSTANTS.Api}/oauth2/token`, {
			method: "POST",
			body: string.substring(1)
		});
		return fetched.json();
	}
}