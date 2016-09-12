import {Observer, Observable} from 'rxjs';
import {ICameraService} from './cameraService';

declare let window;

export class MobileCameraService implements ICameraService {
    public getPhoto(): Observable<string> {
        return Observable.create((observer: Observer<string>) => {
            let removeDomListener = () => {
                document.removeEventListener('deviceready', onCordovaDeviceReady);
            };

            let onCordovaDeviceReady = () => {
                const camera = window.navigator.camera;

                let options = {
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
