import {ModelState} from '../models/modelState';

export interface ISupportsOfflineStorage<T> {
    id: string;
    state: ModelState;
    fromRawJson(rawJson: any): T;
}
