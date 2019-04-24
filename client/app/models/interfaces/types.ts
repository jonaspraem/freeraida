export interface IPost {
    content: string;
    username?: string;
    firstname?: string;
    surname?: string;
    fullname?: string;
    timestamp?: Date;
    gnarly?: string[];
}

export interface IUserProfile {
    _id: string;
    username: string;
    firstname: string;
    surname: string;
    fullname: string;
    country?: string;
    bio?: string;
    social_twitter?: string;
    social_instagram?: string;
    posts?: string[];
    lines?: string[];
    tracked_lines?: string[];
    following?: string[];
    followers?: string[];
}

export interface ILocation {
    // Basic x, y & z coordinate
    latitude: number;
    longitude: number;
    elevation?: number;
}

export interface ILineLocation extends ILocation {
    lineIndex?: number;
    timeFromStart?: string; // hh:mm:ss format
    timeFromLast?: string; // hh:mm:ss format
    distanceFromStart?: number;
    distanceFromLast?: number;
    images?: string[];
}

export interface ILine {
    name: string;
    sport: string;
    discipline: string;
    locations: ILineLocation[];
    username?: string;
    timestamp?: Date;
    peak?: number;
    slope?: number;
}

export interface IPolylineCoordinates {
    org_lat: number;
    org_lng: number;
    destination_lat: number;
    destination_lng: number;
}