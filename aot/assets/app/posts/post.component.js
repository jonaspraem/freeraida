import { Component, Input } from "@angular/core";
import { Post } from "../objects/models/post.model";
import { PostService } from "./post.service";
import { COLOR_DICTIONARY } from "../dictionary/color-dictionary";
import { Router } from "@angular/router";
import { Profile } from "../objects/models/profile.model";
import { AuthService } from "../auth/auth.service";
var gnarly_primary = require('../../images/gnarly/gnarly_primary.png');
var gnarly_secondary = require('../../images/gnarly/gnarly_secondary.png');
var gnarly_secondary_light = require('../../images/gnarly/gnarly_secondary_light.png');
var PostComponent = /** @class */ (function () {
    function PostComponent(post_service, auth_service, colorDictionary, router) {
        this.post_service = post_service;
        this.auth_service = auth_service;
        this.colorDictionary = colorDictionary;
        this.router = router;
        this.gnarly_primary = gnarly_primary;
        this.gnarly_secondary = gnarly_secondary;
        this.gnarly_secondary_light = gnarly_secondary_light;
        this.isExpanded = false;
    }
    PostComponent.prototype.ngOnInit = function () {
        if (this.post.gnarly) {
            this.isGnarly = (this.post.gnarly.indexOf(this.profile.user_address) > -1);
        }
        else
            this.isGnarly = false;
        if (this.isGnarly)
            this.activeImage = this.gnarly_secondary;
        else
            this.activeImage = this.gnarly_secondary_light;
    };
    PostComponent.prototype.getFormattedDate = function () {
        var timestamp = this.post.timestamp;
        var date = timestamp.getDate();
        var month_index = timestamp.getMonth();
        var month;
        switch (month_index) {
            case 0:
                month = 'Jan';
                break;
            case 1:
                month = 'Feb';
                break;
            case 2:
                month = 'Mar';
                break;
            case 3:
                month = 'Apr';
                break;
            case 4:
                month = 'May';
                break;
            case 5:
                month = 'Jun';
                break;
            case 6:
                month = 'Jul';
                break;
            case 7:
                month = 'Aug';
                break;
            case 8:
                month = 'Sep';
                break;
            case 9:
                month = 'Oct';
                break;
            case 10:
                month = 'Nov';
                break;
            case 11:
                month = 'Dec';
                break;
        }
        return date + ' ' + month;
    };
    PostComponent.prototype.hover = function () {
        if (!this.isGnarly)
            this.activeImage = this.gnarly_secondary;
    };
    PostComponent.prototype.unhover = function () {
        if (!this.isGnarly)
            this.activeImage = this.gnarly_secondary_light;
    };
    PostComponent.prototype.gnarly = function () {
        var _this = this;
        this.isGnarly = true;
        if (!this.post.gnarly)
            this.post.gnarly = [this.profile.user_address];
        else
            this.post.gnarly.push(this.profile.user_address);
        this.post_service.gnarlyPost(this.post.postId).subscribe(function (data) {
            _this.post = Post.fabricate(data.obj);
        });
    };
    PostComponent.prototype.unGnarly = function () {
        var _this = this;
        this.isGnarly = false;
        this.post.gnarly.splice(this.post.gnarly.indexOf(this.profile.user_address), 1);
        this.post_service.unGnarlyPost(this.post.postId).subscribe(function (data) {
            _this.post = Post.fabricate(data.obj);
        });
    };
    // onEdit() {
    //     this.postService.editPost(this.post);
    // }
    //
    // onDelete() {
    //     this.postService.deletePost(this.post)
    //         .subscribe(
    //             result => console.log(result)
    //         );
    // }
    // onEdit() {
    //     this.postService.editPost(this.post);
    // }
    //
    // onDelete() {
    //     this.postService.deletePost(this.post)
    //         .subscribe(
    //             result => console.log(result)
    //         );
    // }
    PostComponent.prototype.belongsToUser = 
    // onEdit() {
    //     this.postService.editPost(this.post);
    // }
    //
    // onDelete() {
    //     this.postService.deletePost(this.post)
    //         .subscribe(
    //             result => console.log(result)
    //         );
    // }
    function () {
        return localStorage.getItem('username') == this.post.display_name;
    };
    PostComponent.prototype.hasMoreContent = function () {
        return (this.post.expanded_content != null);
    };
    PostComponent.prototype.showMore = function () {
        this.isExpanded = true;
    };
    PostComponent.prototype.showLess = function () {
        this.isExpanded = false;
    };
    PostComponent.prototype.onAddressClick = function () {
        this.router.navigate(['home/user/' + this.post.user_address]);
    };
    PostComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-post',
                    templateUrl: './post.component.html',
                    styleUrls: ['./post.component.css']
                },] },
    ];
    /** @nocollapse */
    PostComponent.ctorParameters = function () { return [
        { type: PostService, },
        { type: AuthService, },
        { type: COLOR_DICTIONARY, },
        { type: Router, },
    ]; };
    PostComponent.propDecorators = {
        "post": [{ type: Input },],
        "profile": [{ type: Input },],
    };
    return PostComponent;
}());
export { PostComponent };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/posts/post.component.js.map