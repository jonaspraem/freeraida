import { Component, OnInit } from "@angular/core";
import { PostService } from "./post.service";
import { NgForm } from "@angular/forms";

import { Post } from "../objects/models/post.model";

@Component({
    selector: 'app-message-input',
    templateUrl: './post-input.component.html',
    styleUrls: ['./post-input.component.css']
})

export class PostInputComponent implements OnInit{
    post: Post;

    constructor(private postService: PostService) {}

    onSubmit(form: NgForm) {
        if (this.post) {
            // Edit
            // this.post.content = form.value.content;
            // this.postService.updatePost(this.post)
            //     .subscribe(
            //         result => console.log(result)
            //     );
            // this.post = null;
        } else {
            // Create
            const post = new Post(form.value.content);
            this.postService.addPost(post)
                .subscribe(
                    data => console.log(data),
                    error => console.log(error),
                );
        }
        form.resetForm();
    }

    onClear(form: NgForm) {
        this.post = null;
        form.resetForm();
    }

    ngOnInit(): void {
        this.postService.postIsEdit.subscribe(
            (post: Post) => this.post = post
        );
    }
}