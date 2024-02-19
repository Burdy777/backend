import { IChallenge } from '../model/challenge';
import  ChallengeSchema  from '../schema/challenge';
import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import {Quiz} from './../schema/quizz';


const controller = Router();

controller

  .post('/', async (req, res) => {
    console.log('request challenge--------------', req.body)
    const challenge = new ChallengeSchema();
    challenge.name = req.body.name ?? null
    challenge._id = new mongoose.Types.ObjectId() ?? null
    challenge.quiz = new mongoose.Types.ObjectId(req.body.quizz_id) ?? null

    await challenge.save();
    res.status(201).send();
  })

  .get('/', async (req: Request, res: Response) => {
    const challenge = await ChallengeSchema.find();
    res.status(200).send(challenge);
  })

  .get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: 'Required parameter "id" is missing!' });
    }

    const existingChallenge = await ChallengeSchema.findById(id).populate('quiz').exec();
    
    if (!existingChallenge) {
      return res.status(404).send({ message: `Challenge with id: ${id} was not found.` });
    }
    console.log(existingChallenge)

    res.send(existingChallenge);
  })

  .patch('/:id', async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: 'Required parameter "id" is missing!' });
    }

    const existingChallenge = await ChallengeSchema.findById(id);

    if (!existingChallenge) {
      return res
        .status(404)
        .send({ message: `Challenge with id: ${id} was not found.` });
    }

    const changes: Partial<IChallenge> = req.body;

    const updateChallenge = await ChallengeSchema.findOneAndUpdate(
      { _id: id },
      { $set: { ...changes } },
      { new: true }
    );

    res.send(updateChallenge);
  })

  .delete('/:id', async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: 'Required parameter "id" is missing!' });
    }

    const existingChallenge = await ChallengeSchema.findById(id);

    if (!existingChallenge) {
      return res.status(404).send({ message: `Challenge with id: ${id} was not found.` });
    }

    await ChallengeSchema.findByIdAndDelete({ _id: id });

    res.send({ message: 'Challenge removed!' });
  });

export default controller;