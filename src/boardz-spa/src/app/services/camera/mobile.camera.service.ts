import {Observable, Observer} from 'rxjs/Rx';
import {ICameraService} from './camera.service';

declare let window;

export class MobileCameraService implements ICameraService {
    public getPhoto(): Observable<string> {
        return Observable.create((observer: Observer<string>) => {
            const removeDomListener = () => {
                document.removeEventListener('deviceready', onCordovaDeviceReady);
            };

            const onCordovaDeviceReady = () => {
                const camera = window.navigator.camera;

                const options = {
                    quality: 50,
                    destinationType: camera.DestinationType.DATA_URL,
                    sourceType: camera.PictureSourceType.CAMERA,
                    encodingType: camera.EncodingType.JPEG,
                    saveToPhotoAlbum: false,
                    correctOrientation: true
                };

                camera.getPicture(imageData => {
                    observer.next('data:image/png;base64,' + imageData);
                    removeDomListener();
                    observer.complete();
                }, error => {
                    observer.error(error);
                    removeDomListener();
                    observer.complete();
                }, options);
            };

            document.addEventListener('deviceready', onCordovaDeviceReady);
        });
    }
}
