import {Observable} from 'rxjs';

export interface ICameraService {
    getPhoto(): Observable<string>;
}

export abstract class CameraService implements ICameraService {
    public abstract getPhoto(): Observable<string>;
}
