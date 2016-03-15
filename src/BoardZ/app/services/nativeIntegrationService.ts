import {Injectable} from 'angular2/core';
import {Router} from 'angular2/router';

@Injectable()
export class NativeIntegrationService {
    constructor(private _router: Router) {
    }
    
    public init() {
        var that = this;

        if (window.navigator.userAgent.match(/Electron/) !== null) {
            require('electron').ipcRenderer.on('navigateTo', function (event, data) {
                that._router.navigate([data]);
            });
        }
    }
}