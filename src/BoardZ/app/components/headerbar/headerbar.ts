import {Component, Input} from 'angular2/core';
import {NgClass} from 'angular2/common';

@Component({
    selector: 'headerbar',
    directives: [NgClass],
    templateUrl: 'app/components/headerbar/headerbar.html'
})
export class Headerbar {
    @Input()
    showAppname: boolean;

    public useremenuOpen: boolean = false;
    public settingsmenuOpen: boolean = false;
    public notificationsOpen: boolean = false;
}
