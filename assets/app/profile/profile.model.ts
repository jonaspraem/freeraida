export class Profile {
    username: string;
    bio?: string;
    firstName?: string;
    lastName?: string;
    img?: Buffer;
    followers? : string[];
    following? : string[];

    constructor(username: string, bio?: string, firstName?: string, lastName?: string, followers?: string[], following?: string[], img?: Buffer) {
        this.username = username;
        this.bio = bio;
        this.firstName = firstName;
        this.lastName = lastName;
        this.followers = followers;
        this.following = following;
        this.img = img;
    }
}