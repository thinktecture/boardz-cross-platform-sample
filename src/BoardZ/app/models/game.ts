import {ModelState} from './modelState';
import {AgeRating} from './ageRating';
import {Category} from './category';
import {ISupportsOfflineStorage} from '../interfaces/supportsOfflineStorage';
export class Game implements ISupportsOfflineStorage {

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


    public fromRawJson(rawJson: any): Game {
        if (!rawJson) {
            return this;
        }

        this.id = rawJson.id || null;
        this.name = rawJson.name || null;
        this.ageRating = (new AgeRating()).fromRawJson(rawJson.ageRating);
        this.ageRatingId = this.ageRating.id || rawJson.ageRatingId;
        if(rawJson.categories){
            this.categories = rawJson.categories.map(rawCategory=> (new Category).fromRawJson(rawCategory));
        }
        this.description = rawJson.description || null;
        this.userName = rawJson.userName || null;
        this.rowVersion = rawJson.rowVersion || null;
        return this;
    }
}
