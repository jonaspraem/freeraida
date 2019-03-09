import { IPost, IUserProfile } from "./types";

export interface IUserProfileResponse {
    message: string;
    obj: IUserProfile;
}

export interface PostListResponse {
    message: string;
    obj: IPost[];
}