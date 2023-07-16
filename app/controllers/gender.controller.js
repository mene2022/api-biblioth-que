const DatabaseError = require('../error/databaseError');
const ResourceConflictError = require('../error/ressourceConflictError');
const GenderDatamapper = require('../datamappers/gender.datamapper');
const validateId = require('../utils/validateId');
const NotFoundError = require('../error/notFoundError');

module.exports = {

  async getGenders(req, res) {
    const genders = await GenderDatamapper.findAll();
    res.json(genders);
  },

  async addGender(req, res) {
    const data = req.body;
    const genderIsUnique = await GenderDatamapper.isUnique('gender_name', data.gender_name);
    if (genderIsUnique) {
      throw new ResourceConflictError('le genre existe déja');
    }
    const newGender = await GenderDatamapper.create(data);
    if (!newGender) {
      throw new DatabaseError('Erreur lors de la création du niveau genre');
    }
    return res.status(201).json(newGender);
  },
  async updateGender(req, res) {
    const { id } = req.params;
    const data = req.body;
    validateId(id);
    const genderFound = await GenderDatamapper.findByPk(id);
    if (!genderFound) {
      throw NotFoundError(`le genre avec l'id :${id} n'existe pas `);
    }

    const updateGender = await GenderDatamapper.update({ id }, data);
    if (!updateGender) {
      throw new DatabaseError('Erreur lors de la mise à jour du genre');
    }

    return res.json(updateGender);
  },

  async getGenderById(req, res) {
    const { id } = req.params;
    validateId(id);
    const gender = await GenderDatamapper.findByPk(id);
    if (!gender) {
      throw new NotFoundError(`le genre avec l'id :${id} n'existe pas `);
    }
    return res.json(gender);
  },
  async deleteGenderById(req, res) {
    const { id } = req.params;
    validateId(id);
    const foundGender = await GenderDatamapper.findByPk(id);
    if (!foundGender) {
      throw new NotFoundError('le genre n\'existe pas pas');
    }
    const result = await GenderDatamapper.delete(id);
    if (!result) {
      throw new DatabaseError('Error suvenu lors de la suppression');
    }
    return res.json({ message: ` le genre avec l'id ${id} a été bien supprimé` });
  },
};
