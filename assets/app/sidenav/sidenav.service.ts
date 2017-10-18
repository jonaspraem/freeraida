import { Injectable } from "@angular/core";

@Injectable()

export class SidenavService {
    expanded: boolean;

    getExpanded(): boolean {
        return this.expanded
    }

}