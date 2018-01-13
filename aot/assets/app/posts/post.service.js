import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from "@angular/core";
import 'rxjs/Rx';
import { ErrorService } from "../errors/error.service";
var PostService = /** @class */ (function () {
    function PostService(http, errorService) {
        this.http = http;
        this.errorService = errorService;
        this.posts = [];
        this.postIsEdit = new EventEmitter();
    }
    PostService.prototype.addPost = function (post) {
        var body = JSON.stringify(post);
        var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        var token = localStorage.getItem('id_token');
        return this.http.post('http://localhost:3000/post', body, { headers: headers, params: new HttpParams().set('token', token) });
    };
    PostService.prototype.getPosts = function (username) {
        return this.http.get('http://localhost:3000/post/profile-feed/' + username);
    };
    PostService.prototype.getFeed = function () {
        var token = localStorage.getItem('id_token');
        return this.http.get('http://localhost:3000/post/feed', { params: new HttpParams().set('token', token) });
    };
    PostService.prototype.gnarlyPost = function (post_id) {
        var body = '';
        var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        var token = localStorage.getItem('id_token');
        return this.http.post('http://localhost:3000/post/gnarly/' + post_id, body, { headers: headers, params: new HttpParams().set('token', token) });
    };
    PostService.prototype.unGnarlyPost = function (post_id) {
        var body = '';
        var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        var token = localStorage.getItem('id_token');
        return this.http.post('http://localhost:3000/post/un-gnarly/' + post_id, body, { headers: headers, params: new HttpParams().set('token', token) });
    };
    PostService.decorators = [
        { type: Injectable },
    ];
    // editPost(post: Post) {
    //     this.postIsEdit.emit(post);
    // }
    // updatePost(post: Post) {
    //     const body = JSON.stringify(post);
    //     const headers = new HttpHeaders({'Content-Type': 'application/json'});
    //     const token = localStorage.getItem('token')
    //         ? '?token=' + localStorage.getItem('token')
    //         : '';
    //     return this.http.patch('http://localhost:3000/post/' + post.postId + token, body, {headers: headers})
    //         .map((response: Response) => response.json())
    //         .catch((error: Response) => {
    //             this.errorService.handleError(error.json());
    //             return Observable.throw(error.json());
    //         });
    // }
    // deletePost(post: Post) {
    //     this.posts.splice(this.posts.indexOf(post), 1);
    //     const token = localStorage.getItem('token')
    //         ? '?token=' + localStorage.getItem('token')
    //         : '';
    //     return this.http.delete('http://localhost:3000/post/' + post.postId + token)
    //         .map((response: Response) => response.json())
    //         .catch((error: Response) => {
    //             this.errorService.handleError(error.json());
    //             return Observable.throw(error.json());
    //         });
    // }
    /** @nocollapse */
    PostService.ctorParameters = function () { return [
        { type: HttpClient, },
        { type: ErrorService, },
    ]; };
    return PostService;
}());
export { PostService };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/posts/post.service.js.map