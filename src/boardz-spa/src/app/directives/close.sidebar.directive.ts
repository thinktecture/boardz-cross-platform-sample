import {Directive, HostListener} from '@angular/core';
import {RuntimeService} from '../services/infrastructure/runtime.service';

@Directive({
    selector: '[appCloseSidebarOnClick]'
})
export class CloseSidebarDirective {
    constructor(private _platformInformationService: RuntimeService) {
    }

    @HostListener('click')
    public onClick() {
        if (!this._platformInformationService.isMobile) {
        }

        document.body.classList.remove('sidebar-open');
    }
}
