import { Component, Input, OnInit } from "@angular/core";
import { PostService } from "../post.service";
import { NgForm } from "@angular/forms";

import { Post } from "../../objects/models/post.model";
import { Profile } from "../../objects/models/profile.model";
import { COLOR_DICTIONARY } from "../../dictionary/color-dictionary";

@Component({
    selector: 'app-message-input',
    templateUrl: './feed-input.component.html',
    styleUrls: ['./feed-input.component.css']
})

export class PostInputComponent {
    @Input() profile: Profile;
    @Input() posts: Post[];
    content: string = '';

    constructor(private post_service: PostService,
                public color_dictionary: COLOR_DICTIONARY) {}

    onSubmit() {
        const post = new Post(this.content);
        this.post_service.addPost(post)
            .subscribe(
                data => this.posts.unshift(Post.fabricate(data.obj)),
                error => console.log(error),
            );
    }

    onClear() {
        this.content = '';
    }
}