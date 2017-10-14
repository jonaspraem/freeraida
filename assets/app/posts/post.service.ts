import { Headers, Http, Response } from "@angular/http";
import { EventEmitter, Injectable } from "@angular/core";
import 'rxjs/Rx';

import { Post } from "./post.model";
import { Observable } from "rxjs/Observable";
import { ErrorService } from "../errors/error.service";

@Injectable()

export class PostService {
    posts: Post[] = [];
    postIsEdit = new EventEmitter<Post>();

    constructor(private http: Http, private errorService: ErrorService) {}

    addPost(post: Post) {
        const body = JSON.stringify(post);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.post('http://localhost:3000/post' + token, body, {headers: headers})
            .map((response: Response) => {
                const result = response.json().obj;
                const post_obj = new Post(
                    result.content,
                    result.timestamp,
                    result.username,
                    result._id
                );
                this.posts.push(post_obj);
                return post_obj;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    getPosts(username: string) {
        return this.http.get('http://localhost:3000/post/'+username)
            .map((response: Response) => {
                const posts = response.json().obj;
                let transformedPosts: Post[] = [];
                for (let post of posts) {
                    transformedPosts.push(new Post(
                        post.content,
                        post.timestamp,
                        post.username,
                        post._id,
                    ));
                }
                this.posts = transformedPosts;
                return transformedPosts;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    editPost(post: Post) {
        this.postIsEdit.emit(post);
    }

    updatePost(post: Post) {
        const body = JSON.stringify(post);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.patch('http://localhost:3000/post/' + post.postId + token, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    deletePost(post: Post) {
        this.posts.splice(this.posts.indexOf(post), 1);
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.delete('http://localhost:3000/post/' + post.postId + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
}