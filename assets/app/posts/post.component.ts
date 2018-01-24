import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Post } from "../objects/models/post.model";
import { PostService } from "./post.service";
import { COLOR_DICTIONARY } from "../dictionary/color-dictionary";
import { Router } from "@angular/router";
import { Profile } from "../objects/models/profile.model";
import { AuthService } from "../auth/auth.service";

const gnarly_primary = require('../../images/gnarly/gnarly_primary.png');
const gnarly_secondary = require('../../images/gnarly/gnarly_secondary.png');
const gnarly_secondary_light = require('../../images/gnarly/gnarly_secondary_light.png');

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css']
})

export class PostComponent implements OnInit{
    @Output() deleteEvent: EventEmitter<string> = new EventEmitter<string>();
    @Input() post: Post;
    @Input() profile: Profile;
    private gnarly_primary = gnarly_primary;
    private gnarly_secondary = gnarly_secondary;
    private gnarly_secondary_light = gnarly_secondary_light;
    activeImage;
    isGnarly: boolean;
    isExpanded: boolean = false;

    constructor(private post_service : PostService,
                private auth_service: AuthService,
                public color_dictionary : COLOR_DICTIONARY,
                private router : Router) {}

    ngOnInit(): void {
        if (this.post.gnarly) {
            this.isGnarly = (this.post.gnarly.indexOf(this.profile.user_address) > -1);
        } else this.isGnarly = false;

        if (this.isGnarly) this.activeImage = this.gnarly_secondary;
        else this.activeImage = this.gnarly_secondary_light;
    }

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

    hover() {
        if (!this.isGnarly) this.activeImage = this.gnarly_primary;
    }

    unhover() {
        if (!this.isGnarly) this.activeImage = this.gnarly_secondary_light;
    }

    gnarly() {
        this.isGnarly = true;
        if (!this.post.gnarly) this.post.gnarly = [this.profile.user_address];
        else this.post.gnarly.push(this.profile.user_address);
        this.post_service.gnarlyPost(this.post.postId).subscribe(data => {
           this.post = Post.fabricate(data.obj);
        });
    }

    unGnarly() {
        this.isGnarly = false;
        this.post.gnarly.splice(this.post.gnarly.indexOf(this.profile.user_address), 1);
        this.post_service.unGnarlyPost(this.post.postId).subscribe(data => {
           this.post = Post.fabricate(data.obj);
        });
    }

    // onEdit() {
    //     this.postService.editPost(this.post);
    // }
    //
    onDelete() {
        this.post_service.deletePost(this.post.postId)
            .subscribe(
                result => {
                    this.deleteEvent.emit(this.post.postId);
                    console.log(result);
                }
            );
    }

    belongsToUser() {
        return (this.profile.user_address == this.post.user_address);
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