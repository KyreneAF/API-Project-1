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
 /*  validation for sequelize  */

//  app.use((err, _req, _res, next) => {
//   // check if error is a Sequelize error:
//   if (err instanceof ValidationError) {
//     let errors = {};
//     for (let error of err.errors) {
//       errors[error.path] = error.message;
//     }
//     err.title = 'Validation error';
//     err.errors = errors;
//   }
//   next(err);
// });
//this is the code given on the readings the following is from the video
app.use((err,req,res,next) =>{
  if(err instanceof ValidationError){
    err.errors = err.errors.map((e) => e.message);
    err.title = 'Validation error';
  }
  next(err)
})

//error handeler
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
