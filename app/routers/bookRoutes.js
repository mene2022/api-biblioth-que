const express = require('express');

const router = express.Router();
const bookController = require('../controllers/book.controller');
const controllerWrapper = require('../middlewares/wrapperController');
const validator = require('../middlewares/validator');
const bookSchema = require('../schemas/bookCeateSchema');
const bookSchemaUpdate = require('../schemas/bookUpdateSchema');

/**
 * GET /books
 * @summary Get all books
 * @tags books
 * @return {array<object>} 200 - success response - application/json
 * @example response - 200 - example succes response
 * [
 * {
 * "id":5,
 * "title": "Titre du livre 2",
 * "book_summary": "Résumé du livre 2",
 *  "publication_year": 2002,
 *  "author_id": 1,
 *  "created_at": "2023-07-18T10:06:36.612Z",
 *   "updated_at": null
 *},
 *{

  * "id":5,
 * "title": "Titre du livre 5",
 * "book_summary": "Résumé du livre 2",
 *  "publication_year": 2002,
 *  "author_id": 8,
 *  "created_at": "2023-07-18T10:06:36.612Z",
 *   "updated_at": null
 *}

 * ]
 *  */
router.get('/', controllerWrapper(bookController.getBooks));
/**
 * GET /books/{id}
 * @summary Get one book by id
 * @tags books
 * @param {number} id.path.required - book id
 * @return {object} 200 - success response - application/json
 * @return {object} 404 - error response - application/json
 * @return {object} 400 - bad request - application/json
 * @example response - 200 - example success response
 * {
 * "id":5,
 * "title": "Titre du livre 2",
 * "book_summary": "Résumé du livre 2",
 *  "publication_year": 2002,
 *  "author_id": 1,
 *  "created_at": "2023-07-18T10:06:36.612Z",
 *   "updated_at": null
 *}
 * @example response - 404 - example error response
 * {
 *   "message": "le livre avec l'id: 18 n'existe pas",
 *   "status": 404
 * }
 * @example response - 400 - example bad request
 * {
 *  "message": "l'id doit être un nombre valide",
  * "status": 400
*}
 */
router.get('/:id', controllerWrapper(bookController.getBookById));
/**
 * POST /books
 * @tags books
 * @summary Create a new book
 * @param {object} request.body.required - Book data to create
 * @property {string} request.body.title.required - Book title
 * @property {string} request.body.book_summary.required - Book summary
 * @property {number} request.body.publication_year.required - Book publication year
 * @property {number} request.body.author_id.required - Book author id
 * @return {object} 201 - Success response - application/json
 * @return {object} 400 - Bad request - application/json
 * @return {object} 409 - Conflict - application/json
 * @example request - Example book data
 *{
 *   "title": "Science et Nature",
 *   "book_summary": "Résumé du livre",
 *   "publication_year": 2003,
 *   "author_id": 2
 *}
 * @example response - 201 - Example success response
 {
  "id": 6,
  "title": "Science et Nature",
  "book_summary": "Résumé du livre",
  "publication_year": 2003,
  "author_id": 2,
  "created_at": "2023-07-27T10:38:00.310Z",
  "updated_at": null
 }
 * @example response - 400 - Example bad request
 * {
 *   "message": "Invalid data",
 *   "status": 400
 * }

 * @example response - 409 - Example conflict response
 * {
  * "message": "Le livre existe déjà",
  * "status": 409
 * }
 */
router.post('/', validator(bookSchema), controllerWrapper(bookController.addBook));

/**
 * PUT /books/{id}
 * @summary update a book by his id
 *  @tags books
 * @param {number} id.path.required - book id
 * @param {object} request.body.required - book data to update
 * @property {string} request.body.title - book title
 * @property {string} request.body.publication_year - book publication_year
 * @property {string} request.body.book_summary - book book_summary
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - bad request - application/json
 * @return {object} 500 - réponse en cas d'échec - application/json
 * @example request - example book data
 * {
 *   "book_summary": "Voici le nouveau résumé du livre",
 *   "title": "nouveau titre",
 *   "publication_year": 1990
 * }
 * @example response - 200 - example success response
 *  {
 * "id":5,
 * "title": "Titre du livre 2",
 * "book_summary": "Résumé du livre 2",
 *  "publication_year": 2002,
 *  "author_id": 1,
 *  "created_at": "2023-07-18T10:06:36.612Z",
 *   "updated_at": "2023-07-18T15:06:36.612Z"
 *}
  * @example response - 400 - example bad request
 * {
 *  "message": "l'id doit être un nombre valide",
  * "status": 400
*  }
* @example response - 400 - example bad request
*{
  * "message": "\"book_summary\" is not allowed to be empty",
  * "status": 400
*}

 *@example response - 500 - example echec lors de mis à jour
 *{
* "message":"un Problème est survenu lors de la mise à jour",
* "statusCode":500
 *}

 */
router.put('/:id', validator(bookSchemaUpdate), controllerWrapper(bookController.updateBookById));
/**
 * Delete /books/{id}
 * @summary delete a book by his id
 * @tags books
 * @param {number} id.path.required - book id
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - bad request - application/json
 * @example response - 200 - example success response
 * {
 * "message": "le  livre a été supprimé avec succée"
 * }
 * @example response - 400 - example success response
 * {
 * "message": "aucun élément trouvé avec l'id: 14"
 * }
 */
router.delete('/:id', controllerWrapper(bookController.deleteBookById));

module.exports = router;
