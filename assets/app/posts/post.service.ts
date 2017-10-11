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
                const result = response.json();
                const post_obj = new Post(
                    result.obj.content,
                    result.obj.user.firstName,
                    result.obj._id,
                    result.obj.user._id
                );
                this.posts.push(post_obj);
                return post_obj;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    getPosts() {
        return this.http.get('http://localhost:3000/post')
            .map((response: Response) => {
                const messages = response.json().obj;
                let transformedMessages: Post[] = [];
                for (let message of messages) {
                    transformedMessages.push(new Post(
                        message.content,
                        message.user.firstName,
                        message._id,
                        message.user._id
                    ));
                }
                this.posts = transformedMessages;
                return transformedMessages;
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