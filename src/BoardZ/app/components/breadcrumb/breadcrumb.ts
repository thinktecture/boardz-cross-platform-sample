import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {ResolvedInstruction} from 'angular2/src/router/instruction';

import {Logger} from '../../services/logging/logger';

@Component({
    selector: 'breadcrumb',
    template: `
    <div class="breadcrumb-links">
        <span *ngFor="#crumb of crumbs;#last = last;">
            Path: <a href="#" (click)="navigate($event, crumb.url)">{{ crumb.display }}</a>
            <span *ngIf="!last"> &gt; </span>
        </span>
    </div>`
})
export class Breadcrumb {
    public crumbs: any[];

    constructor(private _router: Router, private _logger: Logger) {
        while (this._router.parent) {
            this._router = this._router.parent;
        }

        this._router.subscribe(routeUrl => {
            this._logger.logVerbose('Breadcrumb detected routing to: ' + routeUrl);

            let instructions = [];
            let lastUrl = '';
            this.crumbs = [];

            this._router.recognize(routeUrl).then(instruction => {
                instructions.push(new ResolvedInstruction(instruction.component, null, {}));

                while (instruction.child) {
                    instruction = instruction.child;

                    instructions.push(new ResolvedInstruction(instruction.component, null, {}));
                }

                instructions.forEach(ins => {
                    let display = ins.component.routeData.get('displayName');
                    let currentUrl, crumbUrl;

                    if (display) {
                        currentUrl = ins.toUrlPath();
                        crumbUrl = `${lastUrl}/${currentUrl}`;
                        this.crumbs.push({ url: `${crumbUrl}`, display });
                        lastUrl = crumbUrl;
                    }
                });
            });
        });
    }

    navigate(event, url: string) {
        event.preventDefault();
        this._router.recognize(url).then((ins) => this._router.navigateByInstruction(ins));
    }
}