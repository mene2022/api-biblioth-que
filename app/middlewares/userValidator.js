// eslint-disable-next-line consistent-return
const userValidator = (schema) => async (req, res, next) => {
  try {
    const data = req.body;

    await schema.validateAsync(data);
    next();
  } catch (error) {
    return res.status(400).json({ message: 'Données invalides' });
  }
};

module.exports = userValidator;
