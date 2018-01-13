import { Component } from "@angular/core";
import { ProfileService } from "../profile.service";
import { Profile } from "../../objects/models/profile.model";
import { Router } from "@angular/router";
import { FLAG_DICTIONARY } from "../../dictionary/flag-dictionary";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../auth/auth.service";
import { COLOR_DICTIONARY } from "../../dictionary/color-dictionary";
var twitter = require('../../../images/social/twitter.png');
var instagram = require('../../../images/social/instagram.png');
var SettingsComponent = /** @class */ (function () {
    function SettingsComponent(profile_service, auth_service, router, flag_dictionary, color_dictionary) {
        this.profile_service = profile_service;
        this.auth_service = auth_service;
        this.router = router;
        this.flag_dictionary = flag_dictionary;
        this.color_dictionary = color_dictionary;
        this.control_address = new FormControl(null, Validators.required);
        this.control_firstname = new FormControl(null, Validators.required);
        this.control_surname = new FormControl(null, Validators.required);
        // images
        this.twitter = twitter;
        this.instagram = instagram;
    }
    SettingsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.form = new FormGroup({
            address: this.control_address,
            firstname: this.control_firstname,
            surname: this.control_surname
        });
        this.flag_list = this.flag_dictionary.toList();
        this.profile_service.getProfileWithToken()
            .subscribe(function (data) {
            var profile = data.obj;
            _this.profile = Profile.fabricate(profile);
            _this.isWelcome = false;
            _this.form_canActivate = true;
            console.log('isWelcome: ' + _this.isWelcome);
            _this.control_address.disable();
            _this.control_firstname.disable();
            _this.control_surname.disable();
            _this.form_firstname = profile.firstName;
            _this.form_surname = profile.lastName;
            _this.form_bio = profile.bio;
            _this.form_address = profile.user_address;
            _this.form_representation = profile.representation;
            _this.form_twitter = profile.social_twitter;
            _this.form_instagram = profile.social_instagram;
        }, function (err) {
            console.log(err);
            _this.isWelcome = true;
            console.log('isWelcome: ' + _this.isWelcome);
            _this.form.valueChanges.subscribe(function (data) {
                console.log('Form changes ' + data.address);
                if (data.address == '')
                    _this.form_canActivate = false;
                else
                    _this.profile_service.addressIsAvailable(data.address)
                        .subscribe(function (data) {
                        console.log('result ' + data);
                        _this.form_canActivate = data.obj;
                    }, function (err) {
                        console.log('err ' + err);
                        _this.form_canActivate = false;
                    });
            });
        });
    };
    SettingsComponent.prototype.onSubmit = function () {
        var _this = this;
        var profile = new Profile(this.form_firstname + this.form_surname, this.form_address, this.form_bio, this.form_firstname, this.form_surname, this.form_representation, this.form_twitter, this.form_instagram);
        if (this.auth_service.isWelcome) {
            this.profile_service.createNewProfile(profile).subscribe(function (profile) { return _this.profile = profile; });
            this.auth_service.isWelcome = false;
            this.router.navigate(['home/feed']);
        }
        else
            this.profile_service.submitSettings(profile).subscribe(function (profile) { return _this.profile = profile; });
    };
    SettingsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-settings',
                    templateUrl: './settings.component.html',
                    styleUrls: ['./settings.component.css']
                },] },
    ];
    /** @nocollapse */
    SettingsComponent.ctorParameters = function () { return [
        { type: ProfileService, },
        { type: AuthService, },
        { type: Router, },
        { type: FLAG_DICTIONARY, },
        { type: COLOR_DICTIONARY, },
    ]; };
    return SettingsComponent;
}());
export { SettingsComponent };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/profile/settings/settings.component.js.map