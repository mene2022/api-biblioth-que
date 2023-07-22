const express = require('express');

const router = express.Router();
const validator = require('../middlewares/validator');
const authorCreate = require('../schemas/authorCreateSchema');
const authorController = require('../controllers/author.controller');
const wrapperController = require('../middlewares/wrapperController');
const authorUpdate = require('../schemas/authorUpdateSechma');

/**
 * GET /authors
 * @summary Get all authors
 * @tags authors
 * @return {array<object>} 200 - success response - application/json
 * @example response - 200 - example succes response
 * [
 * {
 * "id":1,
 * "author_name": "John Doe",
 * "author_dob": "1969-12-31T23:00:00.000Z",
 *  "author_nationality": "American",
 *  "created_at": "2023-07-18T10:06:36.612Z",
 *   "updated_at": null
 * },
 *   {
 * "id":2,
 * "author_name": "Jane Doe",
 * "author_dob": "1969-12-31T23:00:00.000Z",
 *  "author_nationality": "American",
 *  "created_at": "2023-07-18T10:06:36.612Z",
 *   "updated_at": null
 * }
 * ]
 */
router.get('/', wrapperController(authorController.getAuhors));
/**
 * GET /authors/{id}
 * @summary Get one author by id
 * @tags authors
 * @param {number} id.path.required - authors id
 * @return {object} 200 - success response - application/json
 * @return {object} 404 - Not Found - application/json
 * @return {object} 400 - bad request - application/json

 * @example response - 200 - example success response
 *  {
 * "id":2,
 * "author_name": "Jane Doe",
 * "author_dob": "1969-12-31T23:00:00.000Z",
 *  "author_nationality": "American",
 *  "created_at": "2023-07-18T10:06:36.612Z",
 *   "updated_at": null
 * }
 * @example response - 404 - example error response
 * {
 *   "message": "l'auteur avec l'id: 18 n'existe pas",
 *   "status": 404
 * }
 * @example response - 400 - example bad request
 * {
 *  "message": "l'id doit être un nombre valide",
  * "status": 400
*}
 */
router.get('/:id', wrapperController(authorController.getAuhorById));
/**
 * POST /authors
 * @tags authors
 * @summary Create a new author
 * @param {object} request.body.required - Author data to create
 * @property {string} request.body.author_name.required - Author name
 * @property {string} request.body.author_nationality.required - Author nationality
 * @property {string} request.body.author_dob.required - Author date of birth
 * @return {object} 201 - success response - application/json
 * @return {object} 400 - bad request - application/json
 * @return {object} 409 - Conflict - application/json
 * @example request - example author data
 * {
 *   "author_name": "John Smith",
 *   "author_nationality": "American",
 *   "author_dob": "1980-01-01"
 * }
 * @example response - 201 - example success response
 * {
 *   "id": 1,
 *   "author_name": "John Smith",
 *   "author_nationality": "American",
 *   "author_dob": "1980-01-01",
 *   "created_at": "2023-07-18T10:06:36.612Z",
 *   "updated_at": null
 * }
 * @example response - 400 - example bad request
 * {
 *   "message": "Invalid data",
 *   "status": 400
 * }
 * @example response - 409 - example conflict response
 * {
  * "message": "l'auteur mene existe déjà",
  * "status": 409
}
 */
router.post('/', validator(authorCreate), wrapperController(authorController.addAuthor));
/**
 * PUT /authors/{id}
 * @tags authors
 * @summary Update an existing author
 * @param {number} id.path.required - Author id
 * @param {object} request.body.required - Author data to update
 * @property {string} request.body.author_name - Author name
 * @property {string} request.body.author_nationality - Author nationality
 * @property {string} request.body.author_dob - Author date of birth
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - bad request - application/json
 * @example request - example author data
 * {
 *   "author_name": "John Smith",
 *   "author_nationality": "American",
 *   "author_dob": "1980-01-01"
 * }
 * @example response - 200 - example success response
 * {
 *   "id": 1,
 *   "author_name": "John Smith",
 *   "author_nationality": "American",
 *   "author_dob": "1980-01-01",
 *   "created_at": "2023-07-18T10:06:36.612Z",
 *   "updated_at": "2023-07-18T15:06:36.612Z"
 * }
 * @example response - 400 - example bad request
 * {
 *   "message": "Invalid data",
 *   "status": 400
 * }
 */
router.put('/:id', validator(authorUpdate), wrapperController(authorController.updateAuhorById));
/**
 * Delete /authors/{id}
 * @summary delete a author by his id
 * @tags authors
 * @param {number} id.path.required - authors id
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - bad request - application/json
 * @example response - 200 - example success response
 * {
 * "message": "l'auteur a été supprimé avec succée"
 * }
 * @example response - 400 - example success response
 * {
 * "message": "aucun élément trouvé avec l'id: 14"
 * }
 */
router.delete('/:id', wrapperController(authorController.deleteAuthorById));
module.exports = router;
