import { Component, Input, OnInit } from "@angular/core";
import { PostService } from "../post.service";
import { NgForm } from "@angular/forms";

import { Post } from "../../objects/models/post.model";
import { Profile } from "../../objects/models/profile.model";

@Component({
    selector: 'app-message-input',
    templateUrl: './feed-input.component.html',
    styleUrls: ['./feed-input.component.css']
})

export class PostInputComponent {
    @Input() posts: Post[];
    @Input() profile: Profile;

    constructor(private post_service: PostService) {}

    onSubmit(form: NgForm) {
        const post = new Post(form.value.content);
        this.post_service.addPost(post)
            .subscribe(
                data => this.posts.push(Post.fabricate(data.obj)),
                error => console.log(error),
            );
        form.resetForm();
    }

    onClear(form: NgForm) {
        form.resetForm();
    }
}