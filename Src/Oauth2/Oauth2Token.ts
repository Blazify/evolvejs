import { EvolveClient, TokenAccessOptions, CONSTANTS } from "..";


export async function Oauth2Token(
        client: EvolveClient,
        options: TokenAccessOptions
) {

        let string = ""
        for (const [key, value] of Object.entries({
            client_id: client.user.id,
            client_secret: client.secret,
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
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: "POST",
            body: string.substring(1)
        })


        return fetched.json()
    }
