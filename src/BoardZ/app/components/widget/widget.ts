import {Component, Input, ChangeDetectionStrategy} from 'angular2/core';

@Component({
    selector: 'widget',
    templateUrl: 'app/components/widget/widget.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WidgetComponent {
    @Input()
    public caption: string;
    @Input()
    public count: string;
    @Input()
    public icon: string;
    @Input()
    public color: string;
    @Input()
    public target: string;
}
