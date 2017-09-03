import {ICameraService} from './camera.service';
import {Observable} from 'rxjs/Rx';

// Just to stop annoying TSC...
declare let window;

export class DesktopCameraService implements ICameraService {

    private getMediaDevices(): any {
        const mediaDevices = ((window.navigator.mozGetUserMedia || window.navigator.webkitGetUserMedia) ? {
                getUserMedia: function (options) {
                    return new Promise((resolve, reject) => {
                        (window.navigator.mozGetUserMedia ||
                        window.navigator.webkitGetUserMedia).call(window.navigator, options, resolve, reject);
                    });
                }
            } : null) || window.navigator.mediaDevices;

        return mediaDevices;
    }

    public getPhoto(): Observable<string> {
        return Observable.fromPromise(
            this.getMediaDevices().getUserMedia({video: true, audio: false})
                .then((stream: any) => {
                        return new Promise((resolve, reject) => {
                            try {
                                const vendorURL = window.URL || window.webkitURL;
                                const doc = document;
                                const videoElement = doc.createElement('video');
                                videoElement.src = vendorURL.createObjectURL(stream);
                                videoElement.play();

                                videoElement.addEventListener('canplay', () => {
                                    const canvasElement = doc.createElement('canvas');
                                    canvasElement.setAttribute('width', videoElement.videoWidth.toString());
                                    canvasElement.setAttribute('height', videoElement.videoHeight.toString());

                                    // Wait a bit before taking a screenshot so the camera has time to adjust lights
                                    setTimeout(() => {
                                        const context = canvasElement.getContext('2d');
                                        context.drawImage(videoElement, 0, 0, videoElement.videoWidth, videoElement.videoHeight);

                                        const url = canvasElement.toDataURL('image/png');

                                        videoElement.pause();

                                        if (stream.stop) {
                                            stream.stop();
                                        }

                                        if (stream.getAudioTracks) {
                                            stream.getAudioTracks().forEach((track: any) => {
                                                track.stop();
                                            });
                                        }

                                        if (stream.getVideoTracks) {
                                            stream.getVideoTracks().forEach((track: any) => {
                                                track.stop();
                                            });
                                        }

                                        resolve(url);
                                    }, 500);
                                });
                            } catch (e) {
                                reject(e);
                            }
                        });

                    }
                ));
    }
}
