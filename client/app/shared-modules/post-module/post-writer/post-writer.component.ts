import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { faFeatherAlt } from '@fortawesome/free-solid-svg-icons';
import { IPost, IUserProfile } from '../../../models/interfaces/types';
import { PostService } from '../../../core/services/post.service';

const defaultImage = require('../../../../images/rider/profile-image.jpg');

@Component({
  host: {
    '(document:click)': 'onClick($event)',
  },
  selector: 'app-post-writer',
  templateUrl: './post-writer.component.html',
})
export class PostWriterComponent {
  @ViewChild('writerContainer') writerContainer: ElementRef;
  @ViewChild('writer') writer: ElementRef;
  @Input() user: IUserProfile;
  public defaultImage = defaultImage;
  public icon = faFeatherAlt;
  public userInput: string = '';

  constructor(private _elRef: ElementRef, private _postService: PostService) {}

  @HostListener('document:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      this.addPost();
    }
  }

  public expand(): void {
    this.writerContainer.nativeElement.className = 'post-writer post-writer--open';
  }

  public close(): void {
    this.writerContainer.nativeElement.className = 'post-writer';
  }

  // On click outside component
  onClick(event) {
    if (!this._elRef.nativeElement.contains(event.target) && this.userInput.length < 1) {
      this.close();
    }
  }

  public addPost(): void {
    if (this.writer.nativeElement.innerText !== '') {
      const post: IPost = {
        content: this.writer.nativeElement.innerText,
      };
      this._postService.addPost(post);
      this.writer.nativeElement.innerText = '';
      this.writer.nativeElement.blur();
      this.close();
    }
  }
}
