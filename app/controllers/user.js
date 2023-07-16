const userDatamapper = require('../datamappers/user.datamapper');
const NotFoundError = require('../error/notFoundError');
const validateId = require('../utils/validateId');
const removeSensitiveData = require('../utils/removeSensitiveData');

module.exports = {
  async getUsers(req, res) {
    const users = await userDatamapper.findAll();
    const modifedUsers = users.map(removeSensitiveData);

    return res.json(modifedUsers);
  },

  async getUserById(req, res) {
    const { id } = req.params;
    validateId(id);
    const user = await userDatamapper.findByPk(id);
    if (!user) {
      throw new NotFoundError(`l'utilisateur avec l'id: ${id} n'existe pas`);
    }
    // eslint-disable-next-line camelcase
    const modifedUser = removeSensitiveData(user);

    return res.json(modifedUser);
  },
  async unpdateUserById(req, res) {
    const { id } = req.params;
    const { ...inputData } = req.body;

    validateId(id);

    const userUpdate = await userDatamapper.update({ id }, inputData);
    // eslint-disable-next-line camelcase
    const modifedUser = removeSensitiveData(userUpdate);

    return res.json(modifedUser);
  },

  async deleteUserById(req, res) {
    const { id } = req.params;
    validateId(id);
    const result = await userDatamapper.delete(id);
    if (!result) {
      throw new NotFoundError('aucun élément trouvé avec avec l\'id spécifié ');
    }
    return res.json({ message: `l'utilsateur avec l'id :${id} a été supprimé avec succées` });
  },
};
