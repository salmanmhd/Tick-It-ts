import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose, { mongo } from 'mongoose';
import dotenv from 'dotenv';
import Todo from './models/userModel';
dotenv.config();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || '';
const app = express();

mongoose.connect(MONGODB_URI);
cors();
app.use(express.json());

app.post('/', async (req, res) => {
  const { title, description } = req.body;

  try {
    const todo = await Todo.create({
      title,
      description,
      completed: false,
    });
    res.status(200).json({
      msg: 'todo added successfully',
      todo,
    });
  } catch (error: any) {
    res.status(400).json({
      msg: 'something went wrong while creating todos',
      error: error.message,
    });
  }
});

app.get('/', async (req, res) => {
  try {
    const todos = await Todo.find({});

    res.status(200).json({
      msg: 'todos fetched successfully',
      todos,
    });
  } catch (error: any) {
    res.status(400).json({
      msg: 'todos fetched successfully',
      error: error.message,
    });
  }
});

app.delete('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const deletedTodo = await Todo.deleteOne({ _id: id });
    res.status(200).json({
      msg: 'todo deleted successfully',
      todo: deletedTodo,
    });
  } catch (error: any) {
    res.status(400).json({
      msg: 'something went wrong while deleting a todo',
      error: error.message,
    });
  }
});

app.put('/:id', async (req, res) => {
  const id = req.params.id;
  const status = req.body.status;
  try {
    const todo = await Todo.findByIdAndUpdate(
      id,
      { completed: status },
      { new: true }
    );
    res.status(200).json({
      msg: 'todo updated successfully',
      todo,
    });
  } catch (error: any) {
    res.status(400).json({
      msg: 'todo updated successfully',
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
