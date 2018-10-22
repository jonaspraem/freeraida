import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from "@angular/core";
import 'rxjs';

import { Post } from "../../legacy/objects/models/post.model";
import { PostObject } from "../../legacy/objects/interfaces/post-object";
import { CONFIG } from "../../dictionary/config";
import { PostTransferModel } from "../../legacy/objects/models/transfer-models/post-transfer.model";

interface SinglePostResponse {
    message: string;
    obj: PostObject;
}

interface PostListResponse {
    message: string;
    obj: PostObject[];
}

interface UserListResponse {
    message: string,
    obj: any
}

@Injectable()

export class AnnouncementService {
    posts: Post[] = [];
    postIsEdit = new EventEmitter<Post>();

    constructor(private http: HttpClient,
                private config: CONFIG
    ) {}

    addPost(post: PostTransferModel) {
        const body = JSON.stringify(post);
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const token = localStorage.getItem('id_token');
        return this.http.post<SinglePostResponse>(this.config.getEndpoint() + '/post', body, {headers: headers, params: new HttpParams().set('token', token)});
    }

    getUsers() {
        return this.http.get<UserListResponse>(this.config.getEndpoint() + '/profile/user-list/');
    }

    getPosts(username: string) {
        return this.http.get<PostListResponse>(this.config.getEndpoint() + '/post/profile-feed/'+username);
    }

    getFeed() {
        const token = localStorage.getItem('id_token');
        return this.http.get<PostListResponse>(this.config.getEndpoint() + '/post/feed', {params: new HttpParams().set('token', token)});
    }

    gnarlyPost(post_id: string) {
        const body = '';
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const token = localStorage.getItem('id_token');
        return this.http.post<SinglePostResponse>(this.config.getEndpoint() + '/post/gnarly/'+post_id, body, {headers: headers, params: new HttpParams().set('token', token)});
    }

    unGnarlyPost(post_id: string) {
        const body = '';
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const token = localStorage.getItem('id_token');
        return this.http.post<SinglePostResponse>(this.config.getEndpoint() + '/post/un-gnarly/'+post_id, body, {headers: headers, params: new HttpParams().set('token', token)});
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

    deletePost(id: string) {
        const token = localStorage.getItem('id_token');
        return this.http.delete<SinglePostResponse>(this.config.getEndpoint() + '/post/'+id, {params: new HttpParams().set('token', token)});
    }
}