export class Profile {
    userId: string;
    bio?: string;

    constructor(userId: string, bio: string) {
        this.userId = userId;
        this.bio = bio;
    }
}