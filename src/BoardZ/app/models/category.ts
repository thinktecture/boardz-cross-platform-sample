import {EntityState} from './entityState';

export class Category {

    constructor() {
        this.entityState = EntityState.Clean;
    }

    public id: string = null;
    public name: string;
    public entityState: EntityState;
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
