import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONFIG } from '../../dictionary/config';
import { IPost } from '../../models/interfaces/types';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface UserListResponse {
  message: string;
  obj: any;
}

@Injectable()
export class PostService {
  private _userFeed: BehaviorSubject<IPost[]> = new BehaviorSubject<IPost[]>([]);
  public readonly userFeed$ = this._userFeed.asObservable();

  constructor(private http: HttpClient, private config: CONFIG) {
    this.refreshFeed().subscribe();
  }

  addPost(post: IPost) {
    const body = JSON.stringify(post);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const token = localStorage.getItem('api_token');
    this.http
      .post(this.config.getEndpoint() + '/api/post/new', body, {
        headers: headers,
        params: new HttpParams().set('token', token),
      })
      .subscribe((res) => {
        console.log('post posted', res);
      });
  }

  getUsers() {
    return this.http.get<UserListResponse>(this.config.getEndpoint() + '/api/profile/user-list/');
  }

  getUserFeed(username: string) {
    return this.http.get<IPost[]>(this.config.getEndpoint() + '/api/post/user-feed/' + username);
  }

  public refreshFeed(): Observable<IPost[]> {
    const token = localStorage.getItem('api_token');
    return this.http
      .get<IPost[]>(this.config.getEndpoint() + '/api/post/feed', { params: new HttpParams().set('token', token) })
      .pipe(
        tap((feed) => {
          this._userFeed.next(feed);
        })
      );
  }

  public getFeed() {
    this.refreshFeed().subscribe();
  }

  gnarlyPost(postId: string): Observable<IPost> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const token = localStorage.getItem('api_token');
    return this.http.post<IPost>(this.config.getEndpoint() + '/api/post/gnarly/' + postId, null, {
      headers: headers,
      params: new HttpParams().set('token', token),
    });
  }

  unGnarlyPost(postId: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const token = localStorage.getItem('api_token');
    return this.http.post<IPost>(this.config.getEndpoint() + '/api/post/un-gnarly/' + postId, null, {
      headers: headers,
      params: new HttpParams().set('token', token),
    });
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

  // deletePost(id: string) {
  //     const token = localStorage.getItem('id_token');
  //     return this.http.delete<SinglePostResponse>(this.config.getEndpoint() + '/post/'+id, {params: new HttpParams().set('token', token)});
  // }
}
