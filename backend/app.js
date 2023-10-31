const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { ValidationError } = require('sequelize');
const { environment } = require('./config');
const isProduction = environment === 'production';

const routes = require('./routes');

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());





/*  Security      */
if (!isProduction) {

  app.use(cors());
}

app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
  })
);


app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true
    }
  })
);

app.use(routes);//this is here so that all of our middleware pass through the above

app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found." ];//was an curly braces but video an array
  err.status = 404;
  next(err);
});


app.use((err,req,res, next) => {

  if (err instanceof ValidationError) {
    let errors = {};
    for (let error of err.errors) {
      errors[error.path] = error.message;
    }
    err.title = 'Validation error';
    err.errors = errors;
  }
  next(err);
});



app.use((err, _req, res, _next) => {
  res.status(err.status || 500);

  if(err.status === 401){
    return res.json({
      message: err.message,
    });
  }

  if(err.status === 403){
    return res.json({message: err.message})
  }
  if(err.status === 400){
    return res.json({
      message:err.message,
      errors:err.errors

    })
  }

 return res.json({
    title: err.title,
    message: err.message,
    errors: err.errors,
  });
});


// //error handeler
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack
  });
});

module.exports = app;
