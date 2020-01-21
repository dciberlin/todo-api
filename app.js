/** EXTERNAL DEPENDENCIES */
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

/** ROUTERS */
const indexRouter = require('./routes/index');
const todosRouter = require('./routes/todos');
const { setCors } = require('./middleware/security');

/** INIT */
const app = express();

/** LOGGING */
app.use(logger('dev'));

/**CONNECT TO DB */
const dbUrl =
  'mongodb+srv://Wasabis:G5pTxd7B5dkQaq3Whvqe5ncch7XEj2@todo-api-oafod.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

mongoose.connection.on('error', console.error);
mongoose.connection.on('open', function() {
  console.log('Database connection established...');
});

/** REQUEST PARSERS */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(setCors);

/** STATIC FILES*/
app.use(express.static(path.join(__dirname, 'public')));

/** ROUTES */
app.use('/', indexRouter);
app.use('/todos', todosRouter);

/** ERROR HANDLING */
app.use(function(req, res, next) {
  const error = new Error('Looks like something broke...');
  error.status = 400;
  next(error);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500).send({
    error: {
      message: err.message
    }
  });
});

/** EXPORT PATH */
module.exports = app;
