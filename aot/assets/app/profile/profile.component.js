import { Component } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from "./profile.service";
import { Profile } from "../objects/models/profile.model";
import { LineService } from "../lines/line.service";
import { FLAG_DICTIONARY } from "../dictionary/flag-dictionary";
import { COLOR_DICTIONARY } from "../dictionary/color-dictionary";
var background_image = require('../../images/licensed/iStock-01.jpg');
var profile_picture = require('../../images/default-skier.jpg');
var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(profile_service, lineService, route, flag_dictionary, color_dictionary) {
        this.profile_service = profile_service;
        this.lineService = lineService;
        this.route = route;
        this.flag_dictionary = flag_dictionary;
        this.color_dictionary = color_dictionary;
        this.background_image = background_image;
        this.profile_picture = profile_picture;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            var user_address = params['user'];
            _this.profile_service.getProfile(user_address.toString())
                .subscribe(function (data) {
                _this.profile = Profile.fabricate(data.obj);
                _this.profile_service.getProfileWithToken()
                    .subscribe(function (data) {
                    _this.self = Profile.fabricate(data.obj);
                    _this.isOwnProfile = (_this.self.user_address == user_address);
                });
            });
            // this.lineService.getLines(user_address.toString())
            //     .subscribe(
            //         (lines: LineTransferModel[]) => {
            //             this.lines = lines;
            //         }
            //     );
        });
    };
    ProfileComponent.prototype.isFollowing = function () {
        if (this.profile && this.self) {
            return (this.profile.followers.includes(this.self.user_address));
        }
        else
            return false;
    };
    ProfileComponent.prototype.follow = function () {
        var _this = this;
        this.profile_service.followUser(this.profile.user_address).subscribe(function (data) { return _this.profile = Profile.fabricate(data.obj); });
    };
    ProfileComponent.prototype.unfollow = function () {
        var _this = this;
        this.profile_service.unfollowUser(this.profile.user_address).subscribe(function (data) { return _this.profile = Profile.fabricate(data.obj); });
    };
    ProfileComponent.prototype.onAddressClick = function () {
    };
    ProfileComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-profile',
                    templateUrl: './profile.component.html',
                    styleUrls: ['./profile.component.css']
                },] },
    ];
    /** @nocollapse */
    ProfileComponent.ctorParameters = function () { return [
        { type: ProfileService, },
        { type: LineService, },
        { type: ActivatedRoute, },
        { type: FLAG_DICTIONARY, },
        { type: COLOR_DICTIONARY, },
    ]; };
    return ProfileComponent;
}());
export { ProfileComponent };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/profile/profile.component.js.map