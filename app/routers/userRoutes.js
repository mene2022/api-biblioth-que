const express = require('express');
const validator = require('../middlewares/validator');

const router = express.Router();
const userController = require('../controllers/user.controller');
const wrapperController = require('../middlewares/wrapperController');
const userUpdateSchema = require('../schemas/userUpdateSchema');

/**
 * GET /users
 * @summary Get all users
 * @tags users
 * @return {array<object>} 200 - success response - application/json
 * @example response - 200 - example succes response
 * [
 * {
 * "id":5,
 * "user_name": "pierre",
 * "user_email": "tes@yahoo.fr",
 *  "user_role": "utilisateur",
 *  "created_at": "2023-07-18T10:06:36.612Z",
 *   "updated_at": null
 *}
 * ]
 */
router.get('/', wrapperController(userController.getUsers));

/**
 * GET /users/{id}
 * @summary Get one user by id
 * @tags users
 * @param {number} id.path.required - User id
 * @return {object} 200 - success response - application/json
 * @return {object} 404 - error response - application/json
 * @return {object} 400 - bad request - application/json
 * @example response - 200 - example success response
 * {
 *   "id": 5,
 *   "user_name": "pierre",
 *   "user_email": "tes@yahoo.fr",
 *   "user_role": "utilisateur",
 *   "created_at": "2023-07-18T10:06:36.612Z",
 *   "updated_at": null
 * }
 * @example response - 404 - example error response
 * {
 *   "message": "l'utilisateur avec l'id: 18 n'existe pas",
 *   "status": 404
 * }
 * @example response - 400 - example bad request
 * {
 *  "message": "l'id doit être un nombre valide",
  * "status": 400
*}
 */
router.get('/:id', wrapperController(userController.getUserById));

/**
 * PUT /users/{id}
 * @summary update a user by his id
 *  @tags users
 * @param {number} id.path.required - user id
 * @param {object} request.body.required - User data to update
 * @property {string} request.body.user_name - User name
 * @property {string} request.body.user_email - User email
 * @property {string} request.body.user_role - User role
 * @property {string} request.body.user_password - User password
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - bad request - application/json
 * @return {object} 409 - Conflict - application/json
 * @example request - example user data
 * {
 *   "user_name": "pierre",
 *   "user_email": "tes@yahoo.fr",
 *   "user_role": "utilisateur"
 * }
 * @example response - 200 - example success response
 * {
 * "id":5,
 * "user_name": "pierre",
 * "user_email": "tes@yahoo.fr",
 *  "user_role": "utilisateur",
 *  "created_at": "2023-07-18T10:06:36.612Z",
 *   "updated_at": "2023-07-18T15:06:36.612Z"
 * }
  * @example response - 400 - example bad request
 * {
 *  "message": "l'id doit être un nombre valide",
  * "status": 400
*  }
* @example response - 409 - example conflict response
*{
*   "message": "l email existe déja",
* "status": 409

 *}

 */
router.put('/:id', validator(userUpdateSchema), wrapperController(userController.updateUserById));

/**
 * Delete /users/{id}
 * @summary delete a user by his id
 * @tags users
 * @param {number} id.path.required - user id
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - bad request - application/json
 * @example response - 200 - example success response
 * {
 * "message": "l'utilsateur a été supprimé avec succée"
 * }
 * @example response - 400 - example success response
 * {
 * "message": "aucun élément trouvé avec l'id: 14"
 * }
 */

router.delete('/:id', wrapperController(userController.deleteUserById));

module.exports = router;
