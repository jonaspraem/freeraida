export class Profile {
    username: string;
    bio?: string;
    firstName?: string;
    lastName?: string;

    constructor(username: string, bio?: string, firstName?: string, lastName?: string) {
        this.username = username;
        this.bio = bio;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}