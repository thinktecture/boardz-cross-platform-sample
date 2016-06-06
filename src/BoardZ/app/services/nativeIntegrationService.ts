import {Injectable, ApplicationRef} from '@angular/core';
import {Router} from '@angular/router-deprecated';
import {PlatformInformationService} from './platformInformationService';

declare var require;

@Injectable()
export class NativeIntegrationService {
    constructor(private _router: Router,
                private _platformInformationService: PlatformInformationService,
                private _applicationRef: ApplicationRef) {
    }

    public init() {
        var that = this;

        /*if (that._platformInformationService.isDesktop) {
            console.log('treated like a desktop')
            require('electron').ipcRenderer.on('navigateTo', function (event, data) {
                that._router.navigate([data]);
            });
        }*/

        // this should be obsolete because of the new router in rc1
        //  this.applyBackWorkaround();
    }

    // issues below were targeting the deprecated router...
    // https://github.com/angular/angular/issues/7722
    // https://github.com/angular/angular/issues/7873
    /*private applyBackWorkaround() {
        this._router.subscribe(() => {
            setTimeout(() => {
                this._applicationRef.tick();
            });
        });
    }*/

}
