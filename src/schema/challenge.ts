import { Schema, model } from 'mongoose';
import { IChallenge } from '../model/challenge';
import {Quiz} from './quizz';

const schema = new Schema<IChallenge>(
  {
    _id: Schema.Types.ObjectId,
    name: {
      type: String,
      required: true,
    },
    quiz: { type: Schema.Types.ObjectId, ref:'Quiz' }
  },
);


export default model<IChallenge>('challenges', schema);