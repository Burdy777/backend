import { Schema, model } from 'mongoose';
import { IStudent } from '../model/student';

const schema = new Schema<IStudent>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    lastname: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      unique: true,
    },
    level: {
      type: Number,
      required: true,
      unique: true,
    },
  },
);

export default model<IStudent>('students', schema);