import { Component, Input } from "@angular/core";
import { Profile } from "../../objects/models/profile.model";
var UserActivityListComponent = /** @class */ (function () {
    function UserActivityListComponent() {
    }
    UserActivityListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-user-activity-list',
                    templateUrl: './user-activity-list.component.html',
                    styleUrls: ['./user-activity-list.component.css']
                },] },
    ];
    /** @nocollapse */
    UserActivityListComponent.ctorParameters = function () { return []; };
    UserActivityListComponent.propDecorators = {
        "profile": [{ type: Input },],
        "posts": [{ type: Input },],
    };
    return UserActivityListComponent;
}());
export { UserActivityListComponent };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/posts/user-activity/user-activity-list.component.js.map