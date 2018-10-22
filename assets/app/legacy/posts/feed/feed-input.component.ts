import { Component, Input } from "@angular/core";
import { AnnouncementService } from "../../core/services/announcement.service";

import { Post } from "../../objects/models/post.model";
import { Profile } from "../../objects/models/profile.model";
import { COLOR_DICTIONARY } from "../../dictionary/color-dictionary";
import { PostTransferModel } from "../../objects/models/transfer-models/post-transfer.model";

@Component({
    selector: 'app-message-input',
    templateUrl: './feed-input.component.html',
    styleUrls: ['./feed-input.component.css']
})

export class PostInputComponent {
    @Input() profile: Profile;
    @Input() posts: Post[];
    @Input() mentions: string[];
    content: string = '';

    constructor(private post_service: AnnouncementService,
                public color_dictionary: COLOR_DICTIONARY) {

    }

    onSubmit() {
        const post = new PostTransferModel(this.content);
        this.post_service.addPost(post)
            .subscribe(
                data => {
                    this.posts.unshift(Post.fabricate(data.obj));
                    this.content = '';
                },
                error => console.log(error),
            );
    }

    onClear() {
        this.content = '';
    }
}