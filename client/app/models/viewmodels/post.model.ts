import { IPost } from '../interfaces/types';

class PostDataModel implements IPost {
  id: string;
  content: string;
  username: string;
  firstname: string;
  surname: string;
  fullname: string;
  timestamp: Date;
  gnarly?: string[];

  constructor(post: IPost) {
    this.content = post.content;
    this.username = post.username;
    this.firstname = post.firstname;
    this.surname = post.surname;
    this.fullname = post.fullname;
    this.timestamp = post.timestamp;
    this.gnarly = post.gnarly;
    this.id = post._id;
  }
}

export class PostViewModel extends PostDataModel {
  content: string;
  expanded_content: string;
  isLiked: boolean;

  constructor(post: IPost, user?: string) {
    super(post);
    if (post.content.length > 500) {
      this.content = this.generateAnchors(post.content.substring(0, 499)) + '...';
      this.expanded_content = this.generateAnchors(post.content);
    } else {
      this.content = this.generateAnchors(post.content);
    }

    this.isLiked = this.gnarly.indexOf(user) > -1;
  }

  /**
        TODO: The anchor generation will break if the @ tag is right between the cut
    */

  private generateAnchors(content: string) {
    return content.replace(/@([^ @]+)/gi, '<a href="/user/$1">@$1</a>');
  }
}
