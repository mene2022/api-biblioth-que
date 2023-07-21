const { DatabaseError } = require('pg');
const RatingDatamapper = require('../models/raiting.datamapper');
const NotFoundError = require('../error/notFoundError');
const validateId = require('../utils/validateId');

module.exports = {
  async getRatigs(req, res) {
    const raitings = await RatingDatamapper.findAll();
    return res.json(raitings);
  },
  async getRatigById(req, res) {
    const { id } = req.params;
    validateId(id);
    const raiting = await RatingDatamapper.findByPk(id);
    if (!raiting) {
      throw new NotFoundError('la rating que tu cherches n\'esxiste pas');
    }
    return res.json(raiting);
  },

  async addRating(req, res) {
    const data = req.body;
    const newRating = await RatingDatamapper.create(data);
    if (!newRating) {
      throw new DatabaseError('Erreur lors de l inserstion de note ');
    }
    return res.json(newRating);
  },
  async updatedRating(req, res) {
    const { id } = req.params;
    const data = req.body;
    validateId(id);
    const foundRating = await RatingDatamapper.findByPk(id);
    if (!foundRating) {
      throw new NotFoundError('la note que tu veux mettre à jour n\'existe pas');
    }
    const updadRating = await RatingDatamapper.update({ id }, data);
    if (!updadRating) {
      throw new DatabaseError('probeleme lors de mise à jour');
    }

    return res.json(updadRating);
  },
  async deleteRating(req, res) {
    const { id } = req.params;
    validateId(id);
    const foundRating = await RatingDatamapper.findByPk(id);
    if (!foundRating) {
      throw new NotFoundError('la note que tu veux supprimer n existe pas ');
    }
    const result = await RatingDatamapper.delete(id);
    if (!result) {
      throw new DatabaseError('erreur lors de la supression de la note');
    }

    return res.json({ message: 'la note a été supprimé avec succé' });
  },
};
