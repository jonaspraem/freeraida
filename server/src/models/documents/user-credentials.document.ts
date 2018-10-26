import { Document } from 'mongoose';

export interface IUserCredentialsDocument extends Document {
    email: string;
    username: string;
    password: string;
}