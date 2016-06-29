import {Directive, HostListener} from '@angular/core';

import {PlatformInformationService} from '../services/platformInformationService';

// This is currently _not_ the correct Angular 2 way of doing this.
// There is no Angular 2 way, yet :)
@Directive({
    selector: '[close-sidebar-on-click]'
})
export class CloseSidebarOnClickDirective {
    constructor(private _platformInformationService: PlatformInformationService) {
    }

    @HostListener('click')
    public onClick() {
        if (!this._platformInformationService.isMobile) {
        }

        document.body.classList.remove('sidebar-open');
    }
}
