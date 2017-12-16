import { PostObject } from "../interfaces/post-object";

export class Post {
    content: string;
    timestamp?: Date;
    display_name?: string;
    user_address: string;
    postId?: string;
    gnarly: string[];
    expanded_content?: string;

    constructor(content: string, timestamp?: Date, display_name?: string, user_address?: string, postId?: string, gnarly?: string[]) {
        this.content = content;
        this.timestamp = timestamp;
        this.display_name = display_name;
        this.user_address = user_address;
        this.postId = postId;
        this.gnarly = gnarly;
        if (content.length > 500) {
            this.content = content.substring(0, 499) + '...';
            this.expanded_content = content;
        }
    }

    public static fabricate(object: PostObject): Post {
        return new Post(
            object.content,
            new Date(object.timestamp),
            object.display_name,
            object.user_address,
            object._id,
            object.gnarly
            );
    }

    public static fabricateList(object: PostObject[]) : Post[] {
        let posts: Post[] = [];
        for (let i = 0; i < object.length; i++) {
            posts.push(this.fabricate(object[i]));
        }
        return posts;
    }
}