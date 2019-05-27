import { IPost } from "./types";

export interface PostListResponse {
    message: string;
    obj: IPost[];
}