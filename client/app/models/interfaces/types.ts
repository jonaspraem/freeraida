export interface IPost {
    content: string,
    username?: string,
    firstname?: string,
    surname?: string,
    fullname?: string,
    timestamp?: Date,
    gnarly?: string[],
}

export interface IUserProfile {
    _id: string,
    username: string,
    firstname: string,
    surname: string,
    fullname: string,
    country?: string,
    bio?: string,
    social_twitter?: string,
    social_instagram?: string,
    posts?: string[],
    lines?: string[],
    tracked_lines?: string[],
    following?: string[],
    followers?: string[],
}

export interface ILocation {
    latitude: number,
    longitude: number,
    height?: number,
}