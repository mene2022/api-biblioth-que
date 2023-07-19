const { DatabaseError } = require('pg');
const Loandatamapper = require('../datamappers/loan.datamapper');
const NotFoundError = require('../error/notFoundError');
const BookDatamapper = require('../datamappers/book.datamapper');
const UserDatamapper = require('../datamappers/user.datamapper');
const validateId = require('../utils/validateId');
const verifyExistence = require('../utils/verifyExistance');
const ValidationError = require('../error/validationError');

module.exports = {
  async getLoans(req, res) {
    const loans = await Loandatamapper.findAll();
    return res.json(loans);
  },
  async getLoanById(req, res) {
    const { id } = req.params;
    // on vérife si l id est bien un nombre valide
    validateId(id);
    // Recherche un prêt par son identifiant
    const foundLoan = await Loandatamapper.findByPk(id);
    if (!foundLoan) {
      // si le prêt n'existe pas ,renvoie une réponse avec un message d'erreur
      throw new NotFoundError('Le prêt que tu cherches n existe pas ');
    }
    return res.json(foundLoan);
  },
  async addLoan(req, res) {
    const data = req.body;
    // on vérifié d'abord si le livre et l'uitilisateur  existent avant de passer le pêt,
    //  si il nexiste pas ,renvoie un message d'erreur

    await verifyExistence(UserDatamapper, data.user_id, `l'utilsateur avec l'id : ${data.user_id} n'existe pas `);
    await verifyExistence(BookDatamapper, data.book_id, `Le livre avec l'id : ${data.book_id} n'existe pas `);

    // on vérifie le status du livre  si borrowed on envoie un message
    const bookLoans = await Loandatamapper.findByStatus(data.book_id);
    const status = bookLoans.find((bookLoan) => bookLoan.status === 'borrowed');
    if (status) {
      throw new ValidationError('Le livre est déja emprunté');
    }

    // Création du nouveau prêt
    const newLoan = await Loandatamapper.create(data);
    if (!newLoan) {
      // si la création échoue, renvoie un message d'erreur
      throw new DatabaseError('Probelem lors d\'insertion d\'un nouveu pret');
    }
    return res.json(newLoan);
  },
  async deleteLoanById(req, res) {
    const { id } = req.params;
    validateId(id);
    // On vérifie d'abord si le prêt existe,s'il n existe pas on envoie un message d'erreur

    await verifyExistence(Loandatamapper, id, 'Le prêt que tu veux supprimer n\'existe pas ');

    // On essaye de supprimer le prêt

    const result = await Loandatamapper.delete(id);
    if (!result) {
      // si la suppression est pas réussi, renvoie un message d 'eerur
      throw new DatabaseError('Erreur lors de la suppression ');
    }
    //  on envoie un message qui indique que le suucée de la suppression
    return res.json({
      message: 'Le prêt a été supprimé avec succé',
    });
  },
};
