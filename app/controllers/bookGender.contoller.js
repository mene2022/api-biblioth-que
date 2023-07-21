const DatabaseError = require('../error/databaseError');
const BookGenderDatamapper = require('../models/bookGender.datamapper');
const BookDatamapper = require('../models/book.datamapper');
const GenderDatamapper = require('../models/gender.datamapper');
const NotFoundError = require('../error/notFoundError');
const validateId = require('../utils/validateId');

module.exports = {
  async getBookGenders(req, res) {
    const bookGenders = await BookGenderDatamapper.findAll();
    res.json(bookGenders);
  },
  async addBookGender(req, res) {
    const data = req.body;
    const foundBook = await BookDatamapper.findByPk(data.book_id);
    const foundGender = await GenderDatamapper.findByPk(data.gender_id);
    const existingLink = await BookGenderDatamapper.linkExists(data.book_id, data.gender_id);

    if (!foundBook) {
      throw new NotFoundError(`Le livre avec l'id :${data.book_id} n'existe pas`);
    }
    if (!foundGender) {
      throw new NotFoundError(`Le genre avec l'id :${data.gender_id} n'existe pas`);
    }
    if (existingLink) {
      throw new DatabaseError('This book is already linked to this gender');
    }
    const newBookGender = await BookGenderDatamapper.create(data);

    if (!newBookGender) {
      throw new DatabaseError('Error lors de l\'inserstion ');
    }

    return res.json({ message: 'la liason a été faite avec succé', newBookGender });
  },
  async getBookGenderById(req, res) {
    const { id } = req.params;
    validateId(id);
    const bookGender = await BookGenderDatamapper.findByPk(id);
    if (!bookGender) {
      throw new NotFoundError(`la realtion avec l id : ${id} n'exite pas`);
    }
    return res.json(bookGender);
  },
  async deleteBookGenderById(req, res) {
    const { id } = req.params;
    validateId(id);
    const foudBookgender = await BookGenderDatamapper.findByPk(id);
    if (!foudBookgender) {
      throw new NotFoundError('la liaison que tu veux supprimer n\'existe pas');
    }
    const result = await BookGenderDatamapper.delete(id);
    if (!result) {
      throw new DatabaseError('Problème lors de surppression');
    }
    return res.json({
      message: 'la liaison a été supprimée avec succée',
    });
  },
};
