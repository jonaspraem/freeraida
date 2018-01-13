import { Component, Input } from "@angular/core";
import { Post } from "../../objects/models/post.model";
import { ActivatedRoute } from "@angular/router";
import { PostService } from "../post.service";
import { Profile } from "../../objects/models/profile.model";
var UserActivityComponent = /** @class */ (function () {
    function UserActivityComponent(post_service, route) {
        this.post_service = post_service;
        this.route = route;
    }
    UserActivityComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            var user_address = params['user'];
            _this.post_service.getPosts(user_address.toString())
                .subscribe(function (data) {
                _this.posts = Post.fabricateList(data.obj);
            });
        });
    };
    UserActivityComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-user-activity',
                    templateUrl: './user-activity.component.html',
                    styleUrls: ['./user-activity.component.css']
                },] },
    ];
    /** @nocollapse */
    UserActivityComponent.ctorParameters = function () { return [
        { type: PostService, },
        { type: ActivatedRoute, },
    ]; };
    UserActivityComponent.propDecorators = {
        "profile": [{ type: Input },],
    };
    return UserActivityComponent;
}());
export { UserActivityComponent };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/posts/user-activity/user-activity.component.js.map