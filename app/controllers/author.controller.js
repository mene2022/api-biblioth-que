const AuthorDatamapper = require('../models/author.datamapper');
const validateId = require('../utils/validateId');
const NotFoundError = require('../error/notFoundError');
const DatabaseError = require('../error/databaseError');
const ResourceConflictError = require('../error/ressourceConflictError');

module.exports = {

  async getAuhors(req, res) {
    const authors = await AuthorDatamapper.findAll();
    res.json(authors);
  },
  async getAuhorById(req, res) {
    const { id } = req.params;
    validateId(id);
    const author = await AuthorDatamapper.findByPk(id);
    if (!author) {
      throw new NotFoundError(`l'auteur avec l'id :${id} n'existe pas `);
    }
    res.json(author);
  },
  async addAuthor(req, res) {
    const data = req.body;

    // On vérifie si l'auteur existe déjà;
    const foundAuthor = await AuthorDatamapper.authorExisting(data);

    // s'il existe on evoie un message d'erreur
    if (foundAuthor) {
      throw new ResourceConflictError(`l'auteur ${data.author_name} existe déjà`);
    }

    // On créee le nouveau auhteur
    const newAuthor = await AuthorDatamapper.create(data);
    if (!newAuthor) {
      throw new DatabaseError('Erreur lors de la création de l\'auteur');
    }
    res.status(201).json(newAuthor);
  },
  async updateAuhorById(req, res) {
    const { id } = req.params;
    const { ...inputdata } = req.body;

    validateId(id);
    const author = await AuthorDatamapper.findByPk(id);
    if (!author) {
      throw new NotFoundError(`l'auteur avec l'id :${id} n'existe pas `);
    }
    const updateAuthor = await AuthorDatamapper.update({ id }, inputdata);
    if (!updateAuthor) {
      throw new DatabaseError('Erreur lors de la mise à jour de l\'auteur');
    }

    return res.json(updateAuthor);
  },
  async deleteAuthorById(req, res) {
    const { id } = req.params;
    validateId(id);
    const resultat = await AuthorDatamapper.delete(id);
    if (!resultat) {
      throw new NotFoundError(`l'auteur avec l'id :${id} n'existe pas`);
    }

    return res.json({ message: `l'auteur avec l'id :${id} a été supprimé avec succées` });
  },
};
