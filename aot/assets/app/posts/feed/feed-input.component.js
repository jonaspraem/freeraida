import { Component, Input } from "@angular/core";
import { PostService } from "../post.service";
import { Post } from "../../objects/models/post.model";
import { Profile } from "../../objects/models/profile.model";
var PostInputComponent = /** @class */ (function () {
    function PostInputComponent(post_service) {
        this.post_service = post_service;
    }
    PostInputComponent.prototype.onSubmit = function (form) {
        var _this = this;
        var post = new Post(form.value.content);
        this.post_service.addPost(post)
            .subscribe(function (data) { return _this.posts.push(Post.fabricate(data.obj)); }, function (error) { return console.log(error); });
        form.resetForm();
    };
    PostInputComponent.prototype.onClear = function (form) {
        form.resetForm();
    };
    PostInputComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-message-input',
                    templateUrl: './feed-input.component.html',
                    styleUrls: ['./feed-input.component.css']
                },] },
    ];
    /** @nocollapse */
    PostInputComponent.ctorParameters = function () { return [
        { type: PostService, },
    ]; };
    PostInputComponent.propDecorators = {
        "posts": [{ type: Input },],
        "profile": [{ type: Input },],
    };
    return PostInputComponent;
}());
export { PostInputComponent };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/posts/feed/feed-input.component.js.map