import {ModelState} from './modelState';
import {AgeRating} from './ageRating';
import {Category} from './category';
export class Game {

    constructor() {
        this.state = ModelState.Clean;
        this.categories = [];
    }

    public id: string = null;
    public name: string;
    public description: string;
    public userName: string;
    public state: ModelState;
    public ageRatingId: string;
    public ageRating: AgeRating;
    public rowVersion: number;
    public categories: Array<Category>;


    public static fromRawJson(rawJson: any): Game {
        if (!rawJson) {
            return new Game();
        }
        let instance: Game = new Game();
        instance.id = rawJson.id || null;
        instance.name = rawJson.name || null;
        instance.ageRating = AgeRating.fromRawJson(rawJson.ageRating);
        instance.ageRatingId = instance.ageRating.id || rawJson.ageRatingId;
        if(rawJson.categories){
            instance.categories = rawJson.categories.map(rawCategory=> Category.fromRawJson(rawCategory));
        }
        instance.description = rawJson.description || null;
        instance.userName = rawJson.userName || null;
        instance.rowVersion = rawJson.rowVersion || null;
        return instance;
    }
}
