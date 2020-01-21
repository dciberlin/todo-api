const Todo = require('../models/Todo');
const createError = require('http-errors');

exports.getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find();
    res.status(200).send(todos);
  } catch (e) {
    next(e);
  }
};

exports.getTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) throw new createError.NotFound();
    res.status(200).send(todo);
  } catch (e) {
    next(e);
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) throw new createError.NotFound();
    res.status(200).send(todo);
  } catch (e) {
    next(e);
  }
};

exports.updateTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!todo) throw new createError.NotFound();
    res.status(200).send(todo);
  } catch (e) {
    next(e);
  }
};

exports.addTodo = async (req, res, next) => {
  try {
    const todo = new Todo(req.body);
    await todo.save();
    res.status(200).send(todo);
  } catch (e) {
    next(e);
  }
};
