import {Injectable} from '@angular/core';

declare let window;

@Injectable()
export class PlatformInformationService {
    private _isMobile: boolean;
    private _isDesktop: boolean;
    private _isWeb: boolean;

    public get isMobile(): boolean {
        return this._isMobile;
    }

    public get isDesktop(): boolean {
        return this._isDesktop;
    }

    public get isWeb(): boolean {
        return this._isWeb;
    }

    constructor() {
        this.guessPlatform();
    }

    private guessPlatform(): void {
        this._isMobile = !!window.cordova;
        this._isDesktop = window.navigator.userAgent.match(/Electron/) !== null;
        this._isWeb = !(this._isMobile || this._isDesktop);
    }
}
