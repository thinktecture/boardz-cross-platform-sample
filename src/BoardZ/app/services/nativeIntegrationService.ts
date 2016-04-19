import {Injectable, ApplicationRef} from 'angular2/core';
import {Router} from 'angular2/router';
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

        if (this._platformInformationService.isDesktop) {
            require('electron').ipcRenderer.on('navigateTo', function (event, data) {
                that._router.navigate([data]);
            });
        }

        this.applyBackWorkaround();
    }

    // https://github.com/angular/angular/issues/7722
    // https://github.com/angular/angular/issues/7873
    private applyBackWorkaround() {
        this._router.subscribe(() => {
            setTimeout(() => {
                this._applicationRef.tick();
            });
        });
    }
}
