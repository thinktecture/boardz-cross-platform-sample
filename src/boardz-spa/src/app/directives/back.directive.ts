import {Directive, HostBinding, HostListener} from '@angular/core';
import {Location} from '@angular/common';

import {RuntimeService} from '../services/infrastructure/runtime.service';

@Directive({
    selector: '[appBackButton]',
})
export class BackDirective {

    @HostBinding('attr.hidden')
    public isHidden = true;

    constructor(private _platformInformationService: RuntimeService,
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
