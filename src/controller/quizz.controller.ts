import { IQuizz } from '../model/quizz';
import  {Quiz as QuizzSchema}  from './../schema/quizz';
import { Router, Request, Response } from 'express';


const controller = Router();

controller

  .post('/', async (req, res) => {
    const quizz = new QuizzSchema();
    quizz.name = req.body.name;
    await quizz.save();
    res.status(201).send(quizz);
  })

  .get('/', async (req: Request, res: Response) => {
    const quizz = await QuizzSchema.find();
    res.status(200).send(quizz);
  })

  .get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: 'Required parameter "id" is missing!' });
    }

    const existingQuizz = await QuizzSchema.findById(id);

    if (!existingQuizz) {
      return res.status(404).send({ message: `Quizz with id: ${id} was not found.` });
    }

    res.send(existingQuizz);
  })

  .patch('/:id', async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: 'Required parameter "id" is missing!' });
    }

    const existingQuizz = await QuizzSchema.findById(id);

    if (!existingQuizz) {
      return res
        .status(404)
        .send({ message: `Quizz with id: ${id} was not found.` });
    }

    const changes: Partial<IQuizz> = req.body;

    const updatedUser = await QuizzSchema.findOneAndUpdate(
      { _id: id },
      { $set: { ...changes } },
      { new: true }
    );

    res.send(updatedUser);
  })

  .delete('/:id', async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: 'Required parameter "id" is missing!' });
    }

    const existingQuizz = await QuizzSchema.findById(id);

    if (!existingQuizz) {
      return res.status(404).send({ message: `Quizz with id: ${id} was not found.` });
    }

    await QuizzSchema.findByIdAndDelete({ _id: id });

    res.send({ message: 'Quizz removed!' });
  });

export default controller;