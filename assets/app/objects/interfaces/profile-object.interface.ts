import { LineObject } from "./line-object.interface";

export interface ProfileObject {
    user_id: string;
    user_address: string;
    bio: string;
    firstName: string;
    lastName: string;
    representation: string;
    social_twitter: string;
    social_instagram: string;
    followers: string[];
    following: string[];
    lines: LineObject[];
}