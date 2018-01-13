import { Component } from '@angular/core';
var SidenavComponent = /** @class */ (function () {
    function SidenavComponent() {
        this.expanded = true;
    }
    SidenavComponent.prototype.ngOnInit = function () {
        this.expanded = true;
    };
    SidenavComponent.prototype.onExpand = function () {
        this.expanded = true;
    };
    SidenavComponent.prototype.onCollapse = function () {
        this.expanded = false;
    };
    SidenavComponent.prototype.isExpanded = function () {
        return this.expanded;
    };
    SidenavComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-sidebar',
                    templateUrl: './sidenav.component.html',
                    styleUrls: ['./sidenav.component.css']
                },] },
    ];
    /** @nocollapse */
    SidenavComponent.ctorParameters = function () { return []; };
    return SidenavComponent;
}());
export { SidenavComponent };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/sidenav/sidenav.component.js.map