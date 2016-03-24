import {Directive, HostListener} from 'angular2/core';
import {Location} from 'angular2/router';

import {PlatformInformationService} from '../services/platformInformationService';

@Directive({
    selector: '[back-button]',
    host: {
        '[attr.hidden]': 'isHidden'
    }
})
export class BackButtonDirective {
    public isHidden: boolean = true;

    constructor(private _platformInformationService: PlatformInformationService,
                private _location: Location) {
        this.setHidden();
    }

    private setHidden(): void {
        this.isHidden = this._platformInformationService.isWeb;
    }

    @HostListener('click')
    public onClick() {
        this._location.back();
    }
}
