import { ObjectId } from 'mongodb';
import { SPORTS } from './sports';

export interface IUserCredentials {
  _id?: ObjectId;
  email: string;
  username: string;
  password: string;
}

export interface IUserProfile {
  _id?: ObjectId;
  username: string;
  firstname: string;
  surname: string;
  fullname: string;
  country?: string;
  bio?: string;
  sports?: SPORTS[];
  social_twitter?: string;
  social_instagram?: string;
  posts?: ObjectId[];
  lines?: ObjectId[];
  tracked_lines?: ObjectId[];
  following?: string[];
  followers?: string[];
  representation?: string;
}

export interface ILocation {
  _id?: ObjectId;
  latitude: number;
  longitude: number;
  elevation: number;
  lineIndex?: number;
  timeFromStart?: string;
  timeFromLast?: string;
  distanceFromStart?: number;
  distanceFromLast?: number;
  country?: string;
  images?: string[];
}

export interface ILine {
  _id?: ObjectId;
  name: string;
  username: string;
  sport: string;
  discipline: string;
  locations: ObjectId[];
  timestamp: Date;
  peak?: number;
  slope?: number;
}

export interface IPost {
  _id?: ObjectId;
  content: string;
  username: string;
  firstname: string;
  surname: string;
  fullname: string;
  timestamp: Date;
  gnarly?: string[];
}
