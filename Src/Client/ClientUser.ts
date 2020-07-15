export class ClientUser {
    constructor(
        private name: string,
        private discriminator: string,
        private verfied: boolean,
        private id: string,
        private flags: number,
        private email: string,
        private bot: boolean,
        private avatar: string
    ) {

    }
}