import {Component, Input, ChangeDetectionStrategy} from 'angular2/core';
import {JsonPipe} from 'angular2/common';

@Component({
    selector: 'diagnostic',
    changeDetection: ChangeDetectionStrategy.OnPush,
    pipes: [JsonPipe],
    templateUrl: 'app/components/diagnostic/diagnostic.html'
})
export class DiagnosticComponent {
    @Input('is-diagnostic-enabled')
    _isDiagnosticEnabled: boolean;
    @Input('data')
    _data: any;
    @Input('title')
    _title: string;
}