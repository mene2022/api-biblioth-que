const NotFoundError = require('../error/notFoundError');

module.exports = async (datamapper, id, errMessage) => {
  const foundEntity = await datamapper.findByPk(id);
  if (!foundEntity) {
    throw new NotFoundError(errMessage);
  }
};
