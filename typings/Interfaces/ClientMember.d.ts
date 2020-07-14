export interface ClientMember {
    name: string;
    discriminator: string;
    verfied: boolean;
    id: string;
    flags: number;
    email: string;
    bot: boolean;
    avatar: string;
}
