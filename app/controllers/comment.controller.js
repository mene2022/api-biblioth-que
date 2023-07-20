const CommentDatamapper = require('../datamappers/comment.datamapper');
const validateId = require('../utils/validateId');
const BookDatamapper = require('../datamappers/book.datamapper');
const UserDatamapper = require('../datamappers/user.datamapper');
const verifyExistance = require('../utils/verifyExistance');
const DatabaseError = require('../error/databaseError');

module.exports = {
  async getComments(req, res) {
    const comments = await CommentDatamapper.findAll();

    res.json(comments);
  },

  async getCommentById(req, res) {
    const { id } = req.params;
    validateId(id); // vérifier si l id est valide sinon renvoie une erreur
    //  Checheer le commentaire avec son id
    const foundComment = await CommentDatamapper.findByPk(id);

    // s'il n'existe pas, renvoe un message d'erreur
    await verifyExistance(CommentDatamapper, id, 'le commentaire n\'existe pas');

    // si il existe, retourne le

    return res.json(foundComment);
  },
  async addComment(req, res) {
    const data = req.body;
    // On vérifie l'existence de l'utilisateur et du livre.
    // Si l'un d'eux n'est pas trouvé, un message d'erreur est envoyé
    await verifyExistance(UserDatamapper, data.user_id, 'l utilsateur n\'existe pas ');
    await verifyExistance(BookDatamapper, data.book_id, ' le livre n\'existe pas ');

    // On créee le commentaire
    const newComment = await CommentDatamapper.create(data);

    // Si un probleme lors de création
    if (!newComment) {
      throw new DatabaseError('Erreur lors de création du commentaire');
    }

    // si le commentaire est bien céer on le renvoie
    return res.json(newComment);
  },
  async updateCommentById(req, res) {
    const { id } = req.params;
    const data = req.body;

    // On vérifie la validité de l'ID. En cas d'invalidité, un message d'erreur est renvoyé.

    validateId(id);

    // La présence du commentaire est vérifiée.
    // Si celui-ci n'est pas trouvé, un message d'erreur est envoyé
    await verifyExistance(CommentDatamapper, id, 'Le commentaire que tu veux mettre à jour n\'existe pas');

    // On fait la mise à jour
    const updateComment = await CommentDatamapper.update({ id }, data);

    //  si la mise à jour n'est pas fait
    if (!updateComment) {
      throw new DatabaseError('Erreur lors de la mise à jour');
    }

    //   si le commentaire est bien mis à jour on le renvoie

    return res.json(updateComment);
  },
  async deleteCommentById(req, res) {
    const { id } = req.params;
    validateId(id);
    await verifyExistance(CommentDatamapper, id, 'Le commentaire que tu veux supprimer n\'existe pas');
    const result = await CommentDatamapper.delete(id);
    if (!result) {
      throw new DatabaseError('Erreur lors de suppression');
    }

    return res.json({
      message: 'Le commentaire a été supprimé',
    });
  },
};
