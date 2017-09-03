import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {RuntimeService} from './runtime.service';
import {IBoardZAppWindow} from '../../interfaces/boardzAppWindow';

declare const window: IBoardZAppWindow;

@Injectable()
export class DesktopService {
    constructor(private _router: Router,
                private _platformInformationService: RuntimeService) {
    }

    public registerNavigationHook() {

        if (this._platformInformationService.isDesktop) {
            /**
             * Brave fighters, you did dare to the deepest depths and slain mighty beasts.
             * But the greatest evil you have to overcome yet, armed with the worst, poisonous
             * weapons and disguised as well-known methods is SystemJS challenge you life and death.
             *
             * May the force be with you!
             */

            // systemJS is trying to require electron if you call it without explicitly calling it on window :facepalm:
            window.require('electron').ipcRenderer.on('navigateTo', (event, data) => {
                this._router.navigate([data]);
            });
        }
    }
}
