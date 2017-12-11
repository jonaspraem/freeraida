export class Post {
    content: string;
    timestamp?: Date;
    display_name?: string;
    postId?: string;
    expanded_content?: string;

    constructor(content: string, timestamp?: Date, display_name?: string, postId?: string) {
        this.content = content;
        this.timestamp = timestamp;
        this.display_name = display_name;
        this.postId = postId;
        if (content.length > 500) {
            this.content = content.substring(0, 499) + '...';
            this.expanded_content = content;
        }
    }
}