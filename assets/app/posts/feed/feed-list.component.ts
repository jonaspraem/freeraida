import { Component, OnInit } from "@angular/core";
import { Post } from "../../objects/models/post.model";
import { PostService } from "../post.service";

@Component({
    selector: 'app-feed-list',
    templateUrl: './feed-list.component.html',
})

export class FeedListComponent implements OnInit{
    posts: Post[];

    constructor(private postService: PostService) {}

    ngOnInit(): void {
        this.postService.getFeed()
            .subscribe(
                data => {
                    console.log(data);
                    this.posts = Post.fabricateList(data.obj);
                }, err => {
                    console.log(err);
                }
            );
    }
}