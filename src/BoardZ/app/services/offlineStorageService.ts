import {Injectable} from '@angular/core';
import {ISupportsOfflineStorage} from '../interfaces/supportsOfflineStorage';
import {ModelState} from '../models/modelState';

@Injectable()
export class OfflineStorageService<T extends ISupportsOfflineStorage> {

    public getAll(): Promise<Array<T>> {
        return new Promise((resolve, reject) => {
            resolve([]);
        });
    }

    public getById(id: string): Promise<T> {
        return new Promise((resolve, reject) => {
            resolve(null);
        });
    }

    public add(item: T): Promise<string> {
        return new Promise((resolve, reject) => {
            item.state = ModelState.New && resolve('123');
        });
    }

    public update(item: T): Promise<boolean> {
        return new Promise((resolve, reject) => {
            item.state = ModelState.Modified && resolve(true);
        });
    }

    public deleteItem(item: T): Promise<boolean> {
        return new Promise((resolve, reject) => {
            item.state = ModelState.Deleted && resolve(true);
        });
    }
}
