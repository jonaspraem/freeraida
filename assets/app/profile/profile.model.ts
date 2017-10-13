import { Post } from "../posts/post.model";

export class Profile {
    username: string;
    bio?: string;
    firstName?: string;
    lastName?: string;
    img?: Buffer;
    followers? : string[];
    following? : string[];
    posts?: Post[];

    constructor(username: string, bio?: string, firstName?: string, lastName?: string, followers?: string[], following?: string[], posts?: Post[], img?: Buffer) {
        this.username = username;
        this.bio = bio;
        this.firstName = firstName;
        this.lastName = lastName;
        this.followers = followers;
        this.following = following;
        this.posts = posts;
        this.img = img;
    }
}