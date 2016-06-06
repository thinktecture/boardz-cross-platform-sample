import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';

@Component({
    moduleId: module.id,
    selector: 'widget',
    templateUrl: 'widget.html',
    directives: [ROUTER_DIRECTIVES],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WidgetComponent {
    @Input('caption')
    _caption: string;
    @Input('count')
    _count: string;
    @Input('icon')
    _icon: string;
    @Input('color')
    _color: string;
    @Input('target')
    _target: string;
}
