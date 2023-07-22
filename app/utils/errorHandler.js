const CustomError = require('../error/customError');

// eslint-disable-next-line consistent-return, no-unused-vars
module.exports = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ message: err.message, status: err.statusCode });
  }
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).send({ error: '"JSON mal formé"' });
  }

  res.status(500).send({ error: 'Internal Server Error' });
};
