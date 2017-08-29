import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
    selector: 'app-widget',
    templateUrl: 'widget.html',
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
