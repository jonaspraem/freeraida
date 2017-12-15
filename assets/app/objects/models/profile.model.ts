import { Post } from "./post.model";
import { LineTransferModel } from "../../lines/lineTransfer.model";
import { ProfileObject } from "../interfaces/profile-object.interface";

export class Profile {
    display_name: string;
    user_address?: string;
    bio?: string;
    firstName?: string;
    lastName?: string;
    representation?: string;
    social_twitter?: string;
    social_instagram?: string;
    img?: Buffer;
    followers? : string[];
    following? : string[];
    posts?: Post[];
    lines?: LineTransferModel[];

    constructor(display_name: string,
                user_address?: string,
                bio?: string,
                firstName?: string,
                lastName?: string,
                representation?: string,
                social_twitter?: string,
                social_instagram?: string,
                followers?: string[],
                following?: string[],
                lines?: LineTransferModel[],
                posts?: Post[],
                img?: Buffer)
    {
        this.display_name = display_name;
        this.user_address = user_address;
        this.bio = bio;
        this.firstName = firstName;
        this.lastName = lastName;
        this.representation = representation;
        this.social_twitter = social_twitter;
        this.social_instagram = social_instagram;
        this.followers = followers;
        this.following = following;
        this.lines = lines;
        this.posts = posts;
        this.img = img;
    }

    public static fabricate(object: ProfileObject): Profile {
        return new Profile(
            object.firstName + ' ' + object.lastName,
            object.user_address,
            object.bio,
            object.firstName,
            object.lastName,
            object.representation,
            object.social_twitter,
            object.social_instagram,
            object.followers,
            object.following,
            object.lines);
    }
}