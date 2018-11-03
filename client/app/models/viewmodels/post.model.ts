import { IPost } from "../interfaces/types";

export class PostViewModel {
    content: string;
    expanded_content: string;

    constructor(post: IPost) {
        if (post.content.length > 500) {
            this.content = this.generateAnchors(post.content.substring(0, 499))+'...';
            this.expanded_content =  this.generateAnchors(post.content);
        } else {
            this.content = this.generateAnchors(post.content);
        }
    }

    /**
        TODO: The anchor generation will break if the @ tag is right between the cut
    */

    private generateAnchors(content: string) {
        return content.replace(/@([^ @]+)/ig, '<a href="/user/$1">@$1</a>');
    }
}