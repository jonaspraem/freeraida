export class Post {
    content: string;
    timestamp?: Date;
    display_name?: string;
    postId?: string;

    constructor(content: string, timestamp?: Date, display_name?: string, postId?: string) {
        this.content = content;
        this.timestamp = timestamp;
        this.display_name = display_name;
        this.postId = postId;
    }
}