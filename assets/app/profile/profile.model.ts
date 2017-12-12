import { Post } from "../posts/post.model";
import { LineTransferModel } from "../lines/lineTransfer.model";

export class Profile {
    username: string;
    user_address?: string;
    bio?: string;
    firstName?: string;
    lastName?: string;
    img?: Buffer;
    followers? : string[];
    following? : string[];
    posts?: Post[];
    lines?: LineTransferModel[];

    constructor(username: string, user_address?: string, bio?: string, firstName?: string, lastName?: string, followers?: string[], following?: string[], lines?: LineTransferModel[], posts?: Post[], img?: Buffer) {
        this.username = username;
        this.user_address = user_address;
        this.bio = bio;
        this.firstName = firstName;
        this.lastName = lastName;
        this.followers = followers;
        this.following = following;
        this.posts = posts;
        this.img = img;
        this.lines = lines;
    }
}