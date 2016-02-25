import {Component, Input, ChangeDetectionStrategy} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: 'widget',
    templateUrl: 'app/components/widget/widget.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    directives: [ROUTER_DIRECTIVES]
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