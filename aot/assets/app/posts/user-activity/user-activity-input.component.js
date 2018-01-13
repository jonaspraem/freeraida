import { Component, Input } from "@angular/core";
import { PostService } from "../post.service";
import { Post } from "../../objects/models/post.model";
import { Profile } from "../../objects/models/profile.model";
var UserActivityInputComponent = /** @class */ (function () {
    function UserActivityInputComponent(post_service) {
        this.post_service = post_service;
        this.content = '';
    }
    UserActivityInputComponent.prototype.onSubmit = function () {
        var _this = this;
        var post = new Post(this.content);
        this.post_service.addPost(post)
            .subscribe(function (data) { return _this.posts.push(Post.fabricate(data.obj)); }, function (error) { return console.log(error); });
    };
    UserActivityInputComponent.prototype.onClear = function () {
        this.content = '';
    };
    UserActivityInputComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-user-activity-input',
                    templateUrl: './user-activity-input.component.html',
                    styleUrls: ['./user-activity-input.component.css']
                },] },
    ];
    /** @nocollapse */
    UserActivityInputComponent.ctorParameters = function () { return [
        { type: PostService, },
    ]; };
    UserActivityInputComponent.propDecorators = {
        "profile": [{ type: Input },],
        "posts": [{ type: Input },],
    };
    return UserActivityInputComponent;
}());
export { UserActivityInputComponent };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/posts/user-activity/user-activity-input.component.js.map