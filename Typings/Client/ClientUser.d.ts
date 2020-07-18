export declare class ClientUser {
    name: string;
    discriminator: string;
    verfied: boolean;
    id: string;
    flags: number;
    email: string;
    bot: boolean;
    avatar: string;
    constructor(name: string, discriminator: string, verfied: boolean, id: string, flags: number, email: string, bot: boolean, avatar: string);
}
