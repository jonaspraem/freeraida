import { Component, Input, OnInit } from "@angular/core";
import { Post } from "../../objects/models/post.model";
import { ActivatedRoute } from "@angular/router";
import { AnnouncementService } from "../../@core/services/announcement.service";
import { Profile } from "../../objects/models/profile.model";

@Component({
    selector: 'app-user-activity',
    templateUrl: './user-activity.component.html',
    styleUrls: ['./user-activity.component.css']
})

export class UserActivityComponent implements OnInit {
    @Input() profile: Profile;
    @Input() posts: Post[];
    mentions: string[];

    constructor(private post_service: AnnouncementService,
                private route: ActivatedRoute) {}

    ngOnInit() {
        this.post_service.getUsers().subscribe(data =>{
            this.mentions = [];
            for (let i = 0; i < data.obj.length; i++) {
                this.mentions.push(data.obj[i].user_address);
            }
        });
    }
}