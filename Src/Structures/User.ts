export default class {

    constructor(
        private id: string,
        private name: string,
        private discriminator: string,
        private avatar: string,
        private bot: boolean,
        private system: boolean,
        private mfaEnabled: boolean,
        private locale: string,
        private verified: boolean,
        private email: string,
        private flags: number,
        private premiumType: number,
        private publicFlags: number
    ) {

    }
}