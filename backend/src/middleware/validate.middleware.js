import { validationResult } from 'express-validator';

const validate = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (validationErrors.isEmpty()) {
    return next();
  }

  return res.status(422).json({
    message: 'Validation failed',
    errors: validationErrors.array().map(({ path, msg }) => ({
      field: path,
      message: msg,
    })),
  });
};

export default validate;
