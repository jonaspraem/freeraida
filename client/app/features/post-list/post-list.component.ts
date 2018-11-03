import { Component, Input } from "@angular/core";
import { IPost } from "../../models/interfaces/types";

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html'
})

export class PostListComponent {
    @Input() list: IPost;


}