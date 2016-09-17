import {ModelState} from './entityState';

export class Category {

    constructor() {
        this.state = ModelState.Clean;
    }

    public id: string = null;
    public name: string;
    public state: ModelState;
    public rowVersion: number;

    public static fromRawJson(rawJson: any): Category {
        if (!rawJson) {
            return new Category();
        }
        let instance: Category = new Category();
        instance.id = rawJson.hasOwnProperty('id') ? rawJson.id : null;
        instance.name = rawJson.hasOwnProperty('name') ? rawJson.name : null;
        instance.rowVersion = rawJson.hasOwnProperty('rowVersion') ? rawJson.rowVersion : -1;
        return instance;
    }
}
