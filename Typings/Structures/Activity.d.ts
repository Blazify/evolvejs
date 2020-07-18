import Emoji from './Emoji';
import TimeStamps from './TimeStamps';
import Party from './Party';
import Assets from './Assets';
import Secrets from './Secrets';
export default class {
    name: string;
    type: number;
    url: string;
    createdAt: number;
    timeStamp: TimeStamps;
    applicationID: string;
    details: string;
    emoji: Emoji;
    party: Party;
    assets: Assets;
    secrets: Secrets;
    instance: boolean;
    flags: number;
    constructor(name: string, type: number, url: string, createdAt: number, timeStamp: TimeStamps, applicationID: string, details: string, emoji: Emoji, party: Party, assets: Assets, secrets: Secrets, instance: boolean, flags: number);
}
