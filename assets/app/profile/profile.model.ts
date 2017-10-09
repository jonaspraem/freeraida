export class Profile {
    username: string;
    bio?: string;
    firstName?: string;
    lastName?: string;
    img?: Buffer;

    constructor(username: string, bio?: string, firstName?: string, lastName?: string, img?: Buffer) {
        this.username = username;
        this.bio = bio;
        this.firstName = firstName;
        this.lastName = lastName;
        this.img = img;
    }
}