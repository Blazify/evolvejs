export default class {
    private id;
    private name;
    private discriminator;
    private avatar;
    private bot;
    private system;
    private mfaEnabled;
    private locale;
    private verified;
    private email;
    private flags;
    private premiumType;
    private publicFlags;
    constructor(id: string, name: string, discriminator: string, avatar: string, bot: boolean, system: boolean, mfaEnabled: boolean, locale: string, verified: boolean, email: string, flags: number, premiumType: number, publicFlags: number);
}
