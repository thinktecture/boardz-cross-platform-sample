import {Directive} from '@angular/core';
import {OfflineDetectionService} from '../services/offlineDetectionService';
import {ConnectionState} from '../models/connectionState';

@Directive({
    selector: 'boardz-header'
})
export class OfflineIndicatorDirective {

    constructor(private _offlineDetectionService: OfflineDetectionService) {
        this._offlineDetectionService.connectionChanged.asObservable().subscribe((connectionState)=> {
            switch (connectionState) {
                case ConnectionState.Offline:
                    document.body.classList.remove('skin-blue', 'skin-red', 'skin-yellow');
                    document.body.classList.add('skin-red');
                    break;
                case ConnectionState.Initializing:
                    document.body.classList.remove('skin-blue', 'skin-red', 'skin-yellow');
                    document.body.classList.add('skin-yellow');
                    break;
                case ConnectionState.Normal:
                    document.body.classList.remove('skin-blue', 'skin-red', 'skin-yellow');
                    document.body.classList.add('skin-blue');
                    break;
                case ConnectionState.Good:
                    document.body.classList.remove('skin-blue', 'skin-red', 'skin-yellow');
                    document.body.classList.add('skin-blue');
                    break;
            }
        });
    }

}
