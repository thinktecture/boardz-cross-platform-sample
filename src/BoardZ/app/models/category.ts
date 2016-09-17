import {ModelState} from './modelState';

export class Category {

    constructor() {
        this.state = ModelState.Clean;
    }

    public id: string = null;
    public name: string;
    public state: ModelState;
    public numberOfGames: number;
    public rowVersion: number;



    public static fromRawJson(rawJson: any): Category {
        if (!rawJson) {
            return new Category();
        }
        let instance: Category = new Category();
        instance.id = rawJson.id || null;
        instance.name = rawJson.name || null;
        instance.rowVersion = rawJson.rowVersion || -1;
        instance.numberOfGames = rawJson.numberOfGames || 0;
        return instance;
    }
}
