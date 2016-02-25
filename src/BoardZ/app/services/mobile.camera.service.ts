import {ICameraService} from './camera.service';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

declare var window;

export class MobileCameraService implements ICameraService {
    public getPhoto(): Observable<string> {
        return Observable.create((observer: Observer) => {
            var removeDomListener = () => {
                document.removeEventListener('deviceready', onCordovaDeviceReady);
            };

            var onCordovaDeviceReady = () => {
                const camera = window.camera;
                const Camera = window.Camera;

                var options = {
                    quality: 50,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    encodingType: Camera.EncodingType.PNG,
                    saveToPhotoAlbum: false,
                    correctOrientation: true
                };

                camera.getPicture(imageData => {
                    observer.next(imageData);
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
