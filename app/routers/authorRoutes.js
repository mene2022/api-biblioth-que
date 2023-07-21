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
 * GET /authors/:id
 * @summary Get one author by id
 * @tags authors
 * @param {number} id.path.required - authors id
 * @return {object} 200 - success response - application/json
 * @return {object} 404 - error response - application/json
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
router.post('/', validator(authorCreate), wrapperController(authorController.addAuthor));
router.put('/:id', validator(authorUpdate), wrapperController(authorController.updateAuhorById));
router.delete('/:id', wrapperController(authorController.deleteAuthorById));
module.exports = router;
