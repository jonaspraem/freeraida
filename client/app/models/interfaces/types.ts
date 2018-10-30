export interface IAnnouncement {
    content: string,
    username: string,
    firstname: string,
    surname: string,
    fullname: string,
    timestamp: Date,
    gnarly?: string[],
}

export interface IUserProfile {
    username: string,
    firstname: string,
    surname: string,
    fullname: string,
    country: string,
    bio: string,
    social_twitter: string,
    social_instagram: string,
    announcements: string[],
    lines: string[],
    tracked_lines: string[],
    following: string[],
    followers: string[],
}