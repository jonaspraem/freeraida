import { Post } from "../posts/post.model";
import { LineTransferModel } from "../lines/lineTransfer.model";

export class Profile {
    display_name: string;
    user_address?: string;
    bio?: string;
    firstName?: string;
    lastName?: string;
    img?: Buffer;
    followers? : string[];
    following? : string[];
    posts?: Post[];
    lines?: LineTransferModel[];

    constructor(display_name: string, user_address?: string, bio?: string, firstName?: string, lastName?: string, followers?: string[], following?: string[], lines?: LineTransferModel[], posts?: Post[], img?: Buffer) {
        this.display_name = display_name;
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