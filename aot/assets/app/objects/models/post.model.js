var Post = /** @class */ (function () {
    function Post(content, timestamp, display_name, user_address, postId, gnarly) {
        this.content = content;
        this.timestamp = timestamp;
        this.display_name = display_name;
        this.user_address = user_address;
        this.postId = postId;
        this.gnarly = gnarly;
        if (content.length > 500) {
            this.content = content.substring(0, 499) + '...';
            this.expanded_content = content;
        }
    }
    Post.fabricate = function (object) {
        return new Post(object.content, new Date(object.timestamp), object.display_name, object.user_address, object._id, object.gnarly);
    };
    Post.fabricateList = function (objects) {
        var posts = [];
        for (var i = 0; i < objects.length; i++) {
            posts.push(this.fabricate(objects[i]));
        }
        return posts;
    };
    return Post;
}());
export { Post };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/objects/models/post.model.js.map