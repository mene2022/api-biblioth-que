// eslint-disable-next-line import/no-extraneous-dependencies
const hashedPassword = require('../utils/bcrypt');
const userDataMapper = require('../datamappers/user.datamapper');

module.exports = {

  async signup(req, res) {
    const data = req.body;

    const emailExisting = await userDataMapper.isUnique('user_email', data.user_email);
    if (emailExisting) {
      return res.status(409).json({ message: `L'email ${data.user_email} existe déjà` });
    }
    const passwordH = await hashedPassword(data.user_password);
    data.user_password = passwordH;

    const newUser = await userDataMapper.create(data);
    return res.json(newUser);
  },
};
