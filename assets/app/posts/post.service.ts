import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from "@angular/core";
import 'rxjs/Rx';

import { Post } from "../objects/models/post.model";
import { ErrorService } from "../errors/error.service";

import { PostObject } from "../objects/interfaces/post-object";

interface SinglePostResponse {
    message: string;
    obj: PostObject;
}

interface PostListResponse {
    message: string;
    obj: PostObject[];
}

@Injectable()

export class PostService {
    posts: Post[] = [];
    postIsEdit = new EventEmitter<Post>();

    constructor(private http: HttpClient, private errorService: ErrorService) {}

    addPost(post: Post) {
        const body = JSON.stringify(post);
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const token = localStorage.getItem('id_token');
        return this.http.post<SinglePostResponse>('http://localhost:3000/post', body, {headers: headers, params: new HttpParams().set('token', token)});
    }

    getPosts(username: string) {
        return this.http.get<PostListResponse>('http://localhost:3000/post/profile-feed/'+username);
    }

    getFeed() {
        const token = localStorage.getItem('id_token');
        return this.http.get<PostListResponse>('http://localhost:3000/post/feed', {params: new HttpParams().set('token', token)});
    }

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
}