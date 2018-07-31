export class RegisterModel {
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
    country: string;

    constructor(username: string, email: string, password: string, password_confirmation: string, country: string) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.password_confirmation = password_confirmation;
        this.country = country;
    }
}