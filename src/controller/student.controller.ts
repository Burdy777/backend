import { IStudent } from '../model/student';
import  StudentSchema  from '../schema/student';
import { Router, Request, Response } from 'express';


const controller = Router();

controller

  .post('/', async (req, res) => {
    const student = new StudentSchema();
    student.name = req.body.name;
    await student.save();
    res.status(201).send(student);
  })

  .get('/', async (req: Request, res: Response) => {
    const student = await StudentSchema.find();
    res.status(200).send(student);
  })

  .get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: 'Required parameter "id" is missing!' });
    }

    const existingSchema = await StudentSchema.findById(id);

    if (!existingSchema) {
      return res.status(404).send({ message: `Student with id: ${id} was not found.` });
    }

    res.send(existingSchema);
  })

  .patch('/:id', async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: 'Required parameter "id" is missing!' });
    }

    const existingSchema = await StudentSchema.findById(id);

    if (!existingSchema) {
      return res
        .status(404)
        .send({ message: `Student with id: ${id} was not found.` });
    }

    const changes: Partial<IStudent> = req.body;

    const updateStudent = await StudentSchema.findOneAndUpdate(
      { _id: id },
      { $set: { ...changes } },
      { new: true }
    );

    res.send(updateStudent);
  })

  .delete('/:id', async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: 'Required parameter "id" is missing!' });
    }

    const existingSchema = await StudentSchema.findById(id);

    if (!existingSchema) {
      return res.status(404).send({ message: `Student with id: ${id} was not found.` });
    }

    await StudentSchema.findByIdAndDelete({ _id: id });

    res.send({ message: 'Student removed!' });
  });

export default controller;