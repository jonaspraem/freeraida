import { Component, Input, OnInit } from "@angular/core";
import { IPost } from "../../models/interfaces/types";
import { PostViewModel } from "../../models/viewmodels/post.model";

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html'
})

export class PostComponent implements OnInit {
    @Input() private readonly _post: IPost;
    public post: PostViewModel;

    ngOnInit(): void {
        this.post = new PostViewModel(this._post);
    }
}