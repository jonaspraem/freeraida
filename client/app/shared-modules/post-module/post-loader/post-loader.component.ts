import { Component } from '@angular/core';
import { PostService } from '../../../core/services/post.service';

@Component({
  selector: 'app-post-loader',
  templateUrl: './post-loader.component.html',
})
export class PostLoaderComponent {
  constructor(private postService: PostService) {}

  public onClick(): void {
    this.postService.getFeed();
  }
}
