export class Country {
    country_name: string;
    image_path: string;

    constructor(country: string, image_path: string) {
        this.country_name = country;
        this.image_path = image_path;
    }
}