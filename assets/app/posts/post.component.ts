import { Component, Input } from "@angular/core";
import { Post } from "./post.model";
import { PostService } from "./post.service";
import { COLOR_DICTIONARY } from "../dictionary/color-dictionary";
import { Router } from "@angular/router";

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css']
})

export class PostComponent {
    @Input() post: Post;
    isExpanded: boolean = false;

    constructor(private postService : PostService, private colorDictionary : COLOR_DICTIONARY, private router : Router) {}

    getFormattedDate() {
        let timestamp: Date = this.post.timestamp;
        let date = timestamp.getDate();
        let month_index = timestamp.getMonth();
        let month;
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
        return localStorage.getItem('username') == this.post.display_name;
    }

    hasMoreContent() : boolean {
        return (this.post.expanded_content != null);
    }

    showMore() {
        this.isExpanded = true;
    }

    showLess() {
        this.isExpanded = false;
    }

    onAddressClick() {
        this.router.navigate(['home/user/'+this.post.user_address]);
    }
}