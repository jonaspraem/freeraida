import { Component } from "@angular/core";
import { Post } from "../../objects/models/post.model";
import { Profile } from "../../objects/models/profile.model";
import { PostService } from "../post.service";
import { ProfileService } from "../../profile/profile.service";
var LiveFeedComponent = /** @class */ (function () {
    function LiveFeedComponent(post_service, profile_service) {
        this.post_service = post_service;
        this.profile_service = profile_service;
        this.instance = this;
    }
    LiveFeedComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.post_service.getFeed().subscribe(function (data) { return _this.posts = Post.fabricateList(data.obj); });
        this.profile_service.getProfileWithToken().subscribe(function (data) { return _this.profile = Profile.fabricate(data.obj); });
    };
    LiveFeedComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-feed',
                    templateUrl: './live-feed.component.html'
                },] },
    ];
    /** @nocollapse */
    LiveFeedComponent.ctorParameters = function () { return [
        { type: PostService, },
        { type: ProfileService, },
    ]; };
    return LiveFeedComponent;
}());
export { LiveFeedComponent };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/posts/feed/live-feed.component.js.map