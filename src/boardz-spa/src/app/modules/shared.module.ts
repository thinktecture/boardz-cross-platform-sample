import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {LocateItComponent} from '../components/locateIt/locateIt';
import {PictureItComponent} from '../components/pictureIt/pictureIt';
import {GeolocationService} from '../services/geolocation.service';
import {RuntimeService} from '../services/infrastructure/runtime.service';
import {DesktopCameraService} from '../services/camera/dekstop.camera.service';
import {MobileCameraService} from '../services/camera/mobile.camera.service';
import {CameraService} from '../services/camera/camera.service';

export function cameraServiceFactory(platformInformationService: RuntimeService): CameraService {
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
            provide: CameraService, useFactory: cameraServiceFactory, deps: [RuntimeService]
        },
        GeolocationService
    ]
})
export class SharedModule {

}
