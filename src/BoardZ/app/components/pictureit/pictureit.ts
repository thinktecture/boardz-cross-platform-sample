import {Component, Input} from 'angular2/core';
import {CameraService} from '../../services/camera.service';

@Component({
    selector: 'picture-it',
    templateUrl: 'app/components/pictureit/pictureit.html'
})
export class PictureItComponent {
    public pictureUrl: string;
    public hasError: boolean;

    constructor(private _cameraService: CameraService) {
        
    }
    
    public takePicture() {
        this.hasError = false;

        this._cameraService.getPhoto()
            .subscribe(
                picture => this.pictureUrl = picture,
                () => this.hasError = true
            )
    }
}
