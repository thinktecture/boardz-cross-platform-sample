import {Observable} from 'rxjs/Rx';
import {Observer} from 'rxjs/Rx';

import {ICameraService} from './cameraService';

declare let window;

export class MobileCameraService implements ICameraService {
    public getPhoto(): Observable<string> {
        // TODO
    }
}
