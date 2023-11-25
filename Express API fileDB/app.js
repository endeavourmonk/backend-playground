const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tours');

const app = express();

// middlewares
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use((req, res, next) => {
  res.requestTime = new Date().toLocaleString();
  next();
});

// Routes
app.use('/api/v1/tours', tourRouter);

// server start
module.exports = app;
