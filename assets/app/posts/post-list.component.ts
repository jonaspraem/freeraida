import { Component, OnInit } from "@angular/core";
import { Post } from "./post.model";
import { PostService } from "./post.service";

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
})

export class PostListComponent implements OnInit{
    posts: Post[];

    constructor(private postService: PostService) {}

    ngOnInit(): void {
        if (localStorage.getItem('username')) {
            this.postService.getPosts(localStorage.getItem('username'))
                .subscribe(
                    (posts: Post[]) => {
                        this.posts = posts;
                    }
                );
        }
    }
}