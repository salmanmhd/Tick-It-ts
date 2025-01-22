import mongoose from 'mongoose';

const TodoModel = new mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});

const todo = mongoose.model('todo', TodoModel);

export default todo;
