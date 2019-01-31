import { IPost } from "../interfaces/types";

class PostDataModel implements IPost {
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
    }
}

export class PostViewModel extends PostDataModel {
    content: string;
    expanded_content: string;

    constructor(post: IPost) {
        super(post);
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