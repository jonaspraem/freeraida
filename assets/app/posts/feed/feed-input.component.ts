import { Component, Input, OnInit } from "@angular/core";
import { PostService } from "../post.service";

import { Post } from "../../objects/models/post.model";
import { Profile } from "../../objects/models/profile.model";
import { COLOR_DICTIONARY } from "../../dictionary/color-dictionary";

@Component({
    selector: 'app-message-input',
    templateUrl: './feed-input.component.html',
    styleUrls: ['./feed-input.component.css']
})

export class PostInputComponent implements OnInit{
    @Input() profile: Profile;
    @Input() posts: Post[];
    @Input() mentions: string[];
    content: string = '';

    constructor(private post_service: PostService,
                public color_dictionary: COLOR_DICTIONARY) {

    }
    ngOnInit() {
        console.log(this.mentions);
    }

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