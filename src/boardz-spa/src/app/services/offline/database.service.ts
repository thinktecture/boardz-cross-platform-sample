import {Injectable} from '@angular/core';
import Dexie from 'dexie';
import {Category} from '../../models/category';
import {Game} from '../../models/game';
import {AgeRating} from '../../models/ageRating';

@Injectable()
export class DatabaseService extends Dexie {

    constructor() {
        super('boardzdb');
        this.version(1).stores({
            games: '&id, name, description, userName, state, ageRatingId, rowVersion',
            categories: '&id, name, state, numberOfGames, rowVersion',
            ageRatings: '&id, name, colorIndicator, state'
        });

    }

    public games: Dexie.Table<Game, string>;
    public categories: Dexie.Table<Category, string>;
    public ageRatings: Dexie.Table<AgeRating, string>;
}
