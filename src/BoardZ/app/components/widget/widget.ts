import {Component, Input, ChangeDetectionStrategy} from '@angular/core';

@Component({
    moduleId: __moduleName,
    selector: 'widget',
    templateUrl: 'widget.html',
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
