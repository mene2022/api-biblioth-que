const DatabaseError = require('../error/databaseError');
const ResourceConflictError = require('../error/ressourceConflictError');
const GenderDatamapper = require('../models/gender.datamapper');
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
    const genderIsUnique = await GenderDatamapper.isUnique('gender_name', data.gender_name);
    if (genderIsUnique) {
      throw new ResourceConflictError('le genre existe déja');
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
    // on vérifie si le genre existe
    const foundGender = await GenderDatamapper.findByPk(id);
    // s'il existe pas on n'envoie un message d'erreur
    if (!foundGender) {
      throw new NotFoundError('le genre n\'existe pas pas');
    }
    // on vérifie si le genre est liée à un ou plusieus livre
    const isRelatedToBook = await GenderDatamapper.isGenreRelatedToBook(id);

    // s'il est liéee à un livre ou plus
    if (isRelatedToBook) {
      throw new ResourceConflictError(`Le genre avec l'id ${id} est lié à un ou plusieurs livres et ne peut pas être supprimé`);
    }

    // on supprime le genre
    const result = await GenderDatamapper.delete(id);
    if (!result) {
      throw new DatabaseError('Error suvenu lors de la suppression');
    }
    return res.json({ message: ` le genre avec l'id ${id} a été bien supprimé` });
  },
};
