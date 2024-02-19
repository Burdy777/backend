import { Document } from 'mongoose';

export interface IChallenge extends Document {
    _id:any;
    name: string;
    quiz: any

}