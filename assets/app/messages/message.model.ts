export class Message {
    content: string;
    author: string;
    messageId?: string;
    userId?: string;

    constructor(content: string, author: string, messageId?: string, userId?: string) {
        this.content = content;
        this.author = author;
        this.messageId = messageId;
        this.userId = userId;
    }
}