export declare class ClientMember {
    private name;
    private discriminator;
    private verfied;
    private id;
    private flags;
    private email;
    private bot;
    private avatar;
    constructor(name: string, discriminator: string, verfied: boolean, id: string, flags: number, email: string, bot: boolean, avatar: string);
}
