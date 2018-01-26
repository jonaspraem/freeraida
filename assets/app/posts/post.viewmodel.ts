import { Post } from "../objects/models/post.model";

export class PostViewModel {
    content: string;
    expanded_content: string;

    constructor(post: Post) {
        if (post.content.length > 500) {
            this.content = this.generateAnchors(post.content.substring(0, 499))+'...';
            this.expanded_content =  this.generateAnchors(post.content);
        } else {
            this.content = this.generateAnchors(post.content);
        }
    }

    private generateAnchors(content: string) {
        return content.replace(/@([^ @]+)/ig, '<a href="/home/user/$1">@$1</a>');
    }
}