import { IQuizz } from './../model/quizz';
import { Schema, model } from 'mongoose';

const schema = new Schema<IQuizz>(
  {
    _id: Schema.Types.ObjectId,
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
);

export const Quiz =  model<IQuizz>('quizzs', schema);