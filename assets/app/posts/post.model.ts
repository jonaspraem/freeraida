export class Post {
    content: string;
    timestamp?: Date;
    display_name?: string;
    user_address: string;
    postId?: string;
    expanded_content?: string;

    constructor(content: string, timestamp?: Date, display_name?: string, user_address?: string, postId?: string) {
        this.content = content;
        this.timestamp = timestamp;
        this.display_name = display_name;
        this.user_address = user_address;
        this.postId = postId;
        if (content.length > 500) {
            this.content = content.substring(0, 499) + '...';
            this.expanded_content = content;
        }
    }
}