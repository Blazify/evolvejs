import Emoji from './Emoji';
import TimeStamps from './TimeStamps';
import Party from './Party';
import Assets from './Assets';
import Secrets from './Secrets';
export default class {
    private name;
    private type;
    private url;
    private createdAt;
    private timeStamp;
    private applicationID;
    private details;
    private emoji;
    private party;
    private assets;
    private secrets;
    private instance;
    private flags;
    constructor(name: string, type: number, url: string, createdAt: number, timeStamp: TimeStamps, applicationID: string, details: string, emoji: Emoji, party: Party, assets: Assets, secrets: Secrets, instance: boolean, flags: number);
}
