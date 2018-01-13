var Profile = /** @class */ (function () {
    function Profile(display_name, user_address, bio, firstName, lastName, representation, social_twitter, social_instagram, followers, following, lines, posts, img) {
        this.display_name = display_name;
        this.user_address = user_address;
        this.bio = bio;
        this.firstName = firstName;
        this.lastName = lastName;
        this.representation = representation;
        this.social_twitter = social_twitter;
        this.social_instagram = social_instagram;
        this.followers = followers;
        this.following = following;
        this.lines = lines;
        this.posts = posts;
        this.img = img;
    }
    Profile.fabricate = function (object) {
        return new Profile(object.firstName + ' ' + object.lastName, object.user_address, object.bio, object.firstName, object.lastName, object.representation, object.social_twitter, object.social_instagram, object.followers, object.following, object.lines);
    };
    return Profile;
}());
export { Profile };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/objects/models/profile.model.js.map