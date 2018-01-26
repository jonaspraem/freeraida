import { PostObject } from "../interfaces/post-object";

export class Post {
    private static content_list = [];
    content: string;
    timestamp?: Date;
    display_name?: string;
    user_address: string;
    postId?: string;
    gnarly: string[];
    expanded_content?: string;

    /*
            The anchor generation will break if the @ tag is right between the cut
     */

    constructor(content: string, timestamp?: Date, display_name?: string, user_address?: string, postId?: string, gnarly?: string[]) {
        this.content = content;
        this.timestamp = timestamp;
        this.display_name = display_name;
        this.user_address = user_address;
        this.postId = postId;
        this.gnarly = gnarly;
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

    public static fabricateList(objects: PostObject[]) : Post[] {
        let posts: Post[] = [];
        for (let i = 0; i < objects.length; i++) {
            posts.push(this.fabricate(objects[i]));
        }
        return posts;
    }
}