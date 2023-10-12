const { validationResult } = require('express-validator');

const handleValidationErrors = (req, _res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      const errors = {};
      validationErrors
        .array()
        .forEach(error => errors[error.path] = error.msg);

      const err = Error("Bad request.");
      err.errors = errors;
      err.status = 400;
     err.title = "Bad request.";

      next(err);
    }
    next();
  };

  const handleSignupValidation = (req, res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      let errors = {};

      validationErrors.array().forEach(error => {
        errors[error.param] = error.msg;
      });
      // let errors = {
      //   errors:errors

      return res.status(400).json({
        message:"Bad Request",
        errors,
      });
    }

    next();
  };

  const handleCreateErrors =(req,res) =>{
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      let errors = {};
      validationErrors.array().forEach(error => {
        // console.log(error.param,'!!!!',error.path,'!!!!',error.field)
        errors[error.path] = error.msg;
      });
      return res.status(400).json({
        message:"Bad Request",
        errors,
      });
    }

    next();
  };


  module.exports = {
    handleValidationErrors,
    handleSignupValidation,
    handleCreateErrors
  };
