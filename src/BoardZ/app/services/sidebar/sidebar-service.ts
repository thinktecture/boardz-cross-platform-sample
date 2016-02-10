import {Injectable} from 'angular2/core';

@Injectable()
export class SidebarService {
    public expanded: boolean = true;

    toggle(): void {
        this.expanded = !this.expanded;
    }
}

