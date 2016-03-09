import {Component, Output, EventEmitter} from 'angular2/core';
import {CameraService} from '../../services/camera.service';

@Component({
    selector: 'picture-it',
    templateUrl: 'app/components/pictureit/pictureit.html'
})
export class PictureItComponent {
    @Output('onPictureTaken')
    private _onPictureTaken: EventEmitter<string> = new EventEmitter<string>();

    public pictureUrl: string;
    public hasError: boolean;

    constructor(private _cameraService: CameraService) {

    }

    public takePicture() {
        this.hasError = false;

        this._cameraService.getPhoto()
            .subscribe(
                picture => this._onPictureTaken.emit(this.pictureUrl = picture),
                () => this.hasError = true
            );
    }
}
