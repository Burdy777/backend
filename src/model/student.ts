import { Document } from 'mongoose';

export interface IStudent extends Document {
    id:string;
    name: string;
    lastname:string;
    description:string;
    level:number;
}