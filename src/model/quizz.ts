import { Document } from 'mongoose';

export interface IQuizz extends Document {
    _id: any;
    name: string;
}