import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {LocateItComponent} from '../components/locateIt/locateIt';
import {PictureItComponent} from '../components/pictureIt/pictureIt';
import {GeolocationService} from '../services/geolocationService';
import {PlatformInformationService} from '../services/platformInformationService';
import {DesktopCameraService} from '../services/desktopCameraService';
import {MobileCameraService} from '../services/mobileCameraService';
import {CameraService} from '../services/cameraService';

export function cameraServiceFactory(platformInformationService: PlatformInformationService): CameraService {
    return platformInformationService.isMobile ? new MobileCameraService() : new DesktopCameraService();
}

@NgModule({
    declarations: [
        PictureItComponent,
        LocateItComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [
        PictureItComponent,
        LocateItComponent
    ],
    providers: [
        {
            provide: CameraService, useFactory: cameraServiceFactory, deps: [PlatformInformationService]
        },
        GeolocationService
    ]
})
export class SharedModule {

}
