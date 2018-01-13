import { Component, Input } from "@angular/core";
import { Profile } from "../../objects/models/profile.model";
var FeedListComponent = /** @class */ (function () {
    function FeedListComponent() {
    }
    FeedListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-feed-list',
                    templateUrl: './feed-list.component.html',
                },] },
    ];
    /** @nocollapse */
    FeedListComponent.ctorParameters = function () { return []; };
    FeedListComponent.propDecorators = {
        "posts": [{ type: Input },],
        "profile": [{ type: Input },],
    };
    return FeedListComponent;
}());
export { FeedListComponent };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/posts/feed/feed-list.component.js.map