import { Post } from "./post.model";
import { Line } from "./line.model";
import { ProfileObject } from "../interfaces/profile-object.interface";
import { TrackedLine } from "./tracked-line.model";

export class Profile {
    display_name: string;
    user_address?: string;
    bio?: string;
    firstname?: string;
    surname?: string;
    representation?: string;
    social_twitter?: string;
    social_instagram?: string;
    img?: Buffer;
    followers? : string[];
    following? : string[];
    tracked_lines?: TrackedLine[];
    posts?: Post[];
    lines?: Line[];

    constructor(display_name: string,
                user_address?: string,
                bio?: string,
                firstname?: string,
                surname?: string,
                representation?: string,
                social_twitter?: string,
                social_instagram?: string,
                followers?: string[],
                following?: string[],
                lines?: Line[],
                tracked_lines?: TrackedLine[],
                posts?: Post[],
                img?: Buffer)
    {
        this.display_name = display_name;
        this.user_address = user_address;
        this.bio = bio;
        this.firstname = firstname;
        this.surname = surname;
        this.representation = representation;
        this.social_twitter = social_twitter;
        this.social_instagram = social_instagram;
        this.followers = followers;
        this.following = following;
        this.lines = lines;
        this.tracked_lines = tracked_lines;
        this.posts = posts;
        this.img = img;
    }

    public static fabricate(object: ProfileObject): Profile {
        return new Profile(
            object.firstname + ' ' + object.surname,
            object.user_address,
            object.bio,
            object.firstname,
            object.surname,
            object.representation,
            object.social_twitter,
            object.social_instagram,
            object.followers,
            object.following,
            object.lines,
            object.tracked_lines);
    }
}