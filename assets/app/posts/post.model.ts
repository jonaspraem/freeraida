export class Post {
    content: string;
    timestamp?: Date;
    username?: string;
    postId?: string;

    constructor(content: string, timestamp?: Date, username?: string, postId?: string) {
        this.content = content;
        this.timestamp = timestamp;
        this.username = username;
        this.postId = postId;
    }
}