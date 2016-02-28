import {ICameraService} from './camera.service';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

declare var window;

export class MobileCameraService implements ICameraService {
    public getPhoto(): Observable<string> {
        return Observable.create((observer: Observer<string>) => {
            var removeDomListener = () => {
                document.removeEventListener('deviceready', onCordovaDeviceReady);
            };

            var onCordovaDeviceReady = () => {
                const camera = window.navigator.camera;

                var options = {
                    quality: 50,
                    destinationType: camera.DestinationType.DATA_URL,
                    sourceType: camera.PictureSourceType.CAMERA,
                    encodingType: camera.EncodingType.PNG,
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
