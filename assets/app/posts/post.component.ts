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

    getFormattedDate() {
        var timestamp: Date = this.post.timestamp;
        var date = timestamp.getDate();
        var month_index = timestamp.getMonth();
        var month;
        switch (month_index) {
            case 0:
                month = 'Jan'; break;
            case 1:
                month = 'Feb'; break;
            case 2:
                month = 'Mar'; break;
            case 3:
                month = 'Apr'; break;
            case 4:
                month = 'May'; break;
            case 5:
                month = 'Jun'; break;
            case 6:
                month = 'Jul'; break;
            case 7:
                month = 'Aug'; break;
            case 8:
                month = 'Sep'; break;
            case 9:
                month = 'Oct'; break;
            case 10:
                month = 'Nov'; break;
            case 11:
                month = 'Dec'; break;
        }
        return date + ' ' + month;
    }

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