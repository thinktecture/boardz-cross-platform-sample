import {ModelState} from './entityState';
export class Game {

    constructor() {
        this.state = ModelState.Clean;
    }

    public id: string = null;
    public name: string;
    public description: string;
    public userName: string;
    public state: ModelState;
    public rowVersion: number;

    public static fromRawJson(rawJson: any): Game {
        if (!rawJson) {
            return new Game();
        }
        let instance: Game = new Game();
        instance.id = rawJson.hasOwnProperty('id') ? rawJson.id : null;
        instance.name = rawJson.hasOwnProperty('name') ? rawJson.name : null;
        instance.description = rawJson.hasOwnProperty('description') ? rawJson.description : null;
        instance.userName = rawJson.hasOwnProperty('userName') ? rawJson.userName : null;
        instance.rowVersion = rawJson.hasOwnProperty('rowVersion')? rawJson.rowVersion: -1;
        return instance;
    }
}
