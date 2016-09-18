import {ModelState} from './modelState';
import {ISupportsOfflineStorage} from '../interfaces/supportsOfflineStorage';

export class Category implements ISupportsOfflineStorage {

    constructor() {
        this.state = ModelState.Clean;
    }

    public id: string = null;
    public name: string;
    public state: ModelState;
    public numberOfGames: number;
    public rowVersion: number;

    public fromRawJson(rawJson: any): Category {
        if (!rawJson) {
            return this;
        }

        this.id = rawJson.id || null;
        this.name = rawJson.name || null;
        this.rowVersion = rawJson.rowVersion || -1;
        this.numberOfGames = rawJson.numberOfGames || 0;
        return this;
    }
}
