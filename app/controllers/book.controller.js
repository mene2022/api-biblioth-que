const { DatabaseError } = require('pg');
const BookDatamapper = require('../models/book.datamapper');
const NotFoundError = require('../error/notFoundError');
const validateId = require('../utils/validateId');

module.exports = {
  async getBooks(req, res) {
    const books = await BookDatamapper.findAll();
    if (!books) {
      throw new NotFoundError('PAS DE LIVRES DISPONIBLES');
    }
    res.json(books);
  },

  async getBookById(req, res) {
    const { id } = req.params;
    validateId(id);
    const book = await BookDatamapper.findByPk(id);
    if (!book) {
      throw new NotFoundError(`le livre avec l'id :${id} n'existe pas`);
    }
    res.json(book);
  },
  async addBook(req, res) {
    const data = req.body;
    const newBook = await BookDatamapper.create(data);
    if (!newBook) {
      throw new DatabaseError('Error lors de l\'insertion de livre');
    }
    res.json(newBook);
  },
  async updateBookById(req, res) {
    const { id } = req.params;
    const data = req.body;
    validateId(id);
    const foundBook = await BookDatamapper.findByPk(id);
    if (!foundBook) {
      throw new NotFoundError('le livre que tu veux mettre à jour n\'existe pas dans la base de données');
    }
    const updateBook = await BookDatamapper.update({ id }, data);
    if (!updateBook) {
      throw new DatabaseError('un Problème est survenu lors de la mise à jour');
    }
    res.json(updateBook);
  },
  async deleteBookById(req, res) {
    const { id } = req.params;
    const foundBook = await BookDatamapper.findByPk(id);
    if (!foundBook) {
      throw new NotFoundError('le livre que tu veux supprimer n existe pas dans la bbd');
    }
    const result = await BookDatamapper.delete(id);
    if (!result) {
      throw new DatabaseError('Une erreur est survenu lors de la supreession du livre ');
    }
    res.json({ message: `le livre avec lid : ${id} a été supprimé avec succé ` });
  },
};
