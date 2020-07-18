export default class {
    id: string;
    name: string;
    discriminator: string;
    avatar: string;
    bot: boolean;
    system: boolean;
    mfaEnabled: boolean;
    locale: string;
    verified: boolean;
    email: string;
    flags: number;
    premiumType: number;
    publicFlags: number;
    constructor(id: string, name: string, discriminator: string, avatar: string, bot: boolean, system: boolean, mfaEnabled: boolean, locale: string, verified: boolean, email: string, flags: number, premiumType: number, publicFlags: number);
}
