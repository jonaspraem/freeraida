export class Post {
    content: string;
    author: string;
    postId?: string;
    userId?: string;

    constructor(content: string, author: string, postId?: string, userId?: string) {
        this.content = content;
        this.author = author;
        this.postId = postId;
        this.userId = userId;
    }
}