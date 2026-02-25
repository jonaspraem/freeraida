import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { IPost } from '../../../models/interfaces/types';
import { PostViewModel } from '../../../models/viewmodels/post.model';
import { PostService } from '../../../core/services/post.service';

const defaultImage = '/js/app/browser/images/rider/profile-image.jpg';

@Component({
  standalone: false,
  selector: 'app-post',
  templateUrl: './post.component.html',
})
export class PostComponent implements OnInit {
  @Input() private readonly postModel: IPost;
  @Input() public readonly isLinked: boolean = true;
  public defaultImage = defaultImage;
  public post: PostViewModel;

  constructor(private postService: PostService, private changeDetectorRef: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.post = new PostViewModel(this.postModel, localStorage.getItem('username'));
  }

  public onGnarlyClick(): void {
    if (this.post.isLiked) {
      this.postService.unGnarlyPost(this.post.id).subscribe((post) => {
        this.post = new PostViewModel(post, localStorage.getItem('username'));
      });
    } else {
      this.postService.gnarlyPost(this.post.id).subscribe((post) => {
        this.post = new PostViewModel(post, localStorage.getItem('username'));
      });
    }
  }
}
