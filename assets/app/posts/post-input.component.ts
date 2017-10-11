import { Component, OnInit } from "@angular/core";
import { PostService } from "./post.service";
import { Post } from "./post.model";
import { NgForm } from "@angular/forms";

@Component({
    selector: 'app-message-input',
    templateUrl: './post-input.component.html',
})

export class PostInputComponent implements OnInit{
    message: Post;

    constructor(private postService: PostService) {}

    onSubmit(form: NgForm) {
        if (this.message) {
            // Edit
            this.message.content = form.value.content;
            this.postService.updatePost(this.message)
                .subscribe(
                    result => console.log(result)
                );
            this.message = null;
        } else {
            // Create
            const message = new Post(form.value.content, '');
            this.postService.addPost(message)
                .subscribe(
                    data => console.log(data),
                    error => console.log(error),
                );
        }
        form.resetForm();
    }

    onClear(form: NgForm) {
        this.message = null;
        form.resetForm();
    }

    ngOnInit(): void {
        this.postService.postIsEdit.subscribe(
            (message: Post) => this.message = message
        );
    }
}