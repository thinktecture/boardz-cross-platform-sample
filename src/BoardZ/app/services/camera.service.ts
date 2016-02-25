import {Observable} from 'rxjs/Observable';

export interface ICameraService {
    getPhoto(): Observable<string>;
}

export abstract class CameraService implements ICameraService {
    public abstract getPhoto(): Observable<string>;
}
