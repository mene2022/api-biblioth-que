// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const bcrypt = require('../utils/bcrypt');
const userDataMapper = require('../datamappers/user.datamapper');
const ResourceConflictError = require('../error/ressourceConflictError');
const NotFoundError = require('../error/notFoundError');

const AuthentificationError = require('../error/authenticationError');

module.exports = {

  async signup(req, res) {
    const data = req.body;

    const emailIsUnique = await userDataMapper.isUnique('user_email', data.user_email);
    if (emailIsUnique) {
      throw new ResourceConflictError(`L'email ${data.user_email} existe déjà`);
    }
    const passwordH = await bcrypt.hashPassword(data.user_password);
    data.user_password = passwordH;

    const newUser = await userDataMapper.create(data);
    // créer un jwt et le retourner
    const token = jwt.sign({ userId: newUser.id }, process.env.JWTSECRET, { expiresIn: '1h' });
    return res.status(201).json({ userId: newUser.id, token });
  },

  async login(req, res) {
    // eslint-disable-next-line camelcase
    const { user_email, user_password } = req.body;
    const user = await userDataMapper.findByEmeail(user_email);

    if (!user) {
      throw new NotFoundError('Adresse e-mail non trouvée');
    }
    const passwordMatch = await bcrypt.comparePassword(user_password, user.user_password);

    if (!passwordMatch) {
      throw new AuthentificationError('Mot de passe incorrect.');
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWTSECRET, { expiresIn: '1h' });
    return res.json({
      token,
      userId: user.id,
    });
  },
};
