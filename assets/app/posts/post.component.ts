import { Component, Input } from "@angular/core";
import { Post } from "./post.model";
import { PostService } from "./post.service";

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css']
})

export class PostComponent {
    @Input() post: Post;

    constructor(private postService : PostService) {}

    onEdit() {
        this.postService.editPost(this.post);
    }

    onDelete() {
        this.postService.deletePost(this.post)
            .subscribe(
                result => console.log(result)
            );
    }

    belongsToUser() {
        return localStorage.getItem('username') == this.post.username;
    }
}