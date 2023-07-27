const express = require('express');

const router = express.Router();
const genderController = require('../controllers/gender.controller');
const controllerWrapper = require('../middlewares/wrapperController');
const genderCreateSchema = require('../schemas/genderCreateSchema');
const genderSchemaUpdateSchema = require('../schemas/genderUpdateSchema');
const validator = require('../middlewares/validator');
/**
 * GET /genders
 * @summary Get all genders
 * @tags genders
 * @return {array<object>} 200 - success response - application/json
 * @example response - 200 - example succes response
 * [
 * {
 *    "id": 1,
  *  "gender_name": "Science Fiction",
 *  "created_at": "2023-07-17T12:11:34.078Z",
   * "updated_at": null

 *},
 *{

   *"id": 1,
   * "gender_name": "Romance",
   * "created_at": "2023-07-17T12:11:34.078Z",
   * "updated_at": null
 *}

 * ]
 *  */

router.get('/', controllerWrapper(genderController.getGenders));
/**
 * POST /genders
 * @tags genders
 * @summary Create a new gender
 * @param {object} request.body.required - gender data to create
 * @property {string} request.body.title.required - gender title
 * @property {string} request.body.gender_name.required - gender summary
 * @return {object} 201 - Success response - application/json
 * @return {object} 400 - Bad request - application/json
 * @return {object} 409 - Conflict - application/json
 * @example request - Example gender data
 *{
 *  "gender_name": "Science Fiction"
 *}
 * @example response - 201 - Example success response
 {
  "id": 1,
    "gender_name": "Science Fiction",
    "created_at": "2023-07-17T12:11:34.078Z",
    "updated_at": null
 }
 * @example response - 400 - Example bad request
 * {
 *   "message": "Invalid data",
 *   "status": 400
 * }

 * @example response - 409 - Example conflict response
 * {
  * "message": "Le genre existe déjà",
  * "status": 409
 * }
 */
router.post('/', validator(genderCreateSchema), controllerWrapper(genderController.addGender));
/**
 * GET /genders/{id}
 * @summary Get one gender by id
 * @tags genders
 * @param {number} id.path.required - gender id
 * @return {object} 200 - success response - application/json
 * @return {object} 404 - error response - application/json
 * @return {object} 400 - bad request - application/json
 * @example response - 200 - example success response
 * {

    "id": 2,
    "gender_name": "Romance",
    "created_at": "2023-07-17T12:11:46.923Z",
    "updated_at": null

 *}
 * @example response - 404 - example error response
 * {
 *   "message": "le genre avec l'id: 18 n'existe pas",
 *   "status": 404
 * }
 * @example response - 400 - example bad request
 * {
 *  "message": "l'id doit être un nombre valide",
  * "status": 400
*}
 */
router.get('/:id', controllerWrapper(genderController.getGenderById));
/**
 * Put /genders/{id}
 * @tags genders
 * @summary Create a new gender
 * @param {number} id.path.required - gender id
 * @param {object} request.body.required - gender data to create
 * @property {string} request.body.gender_name - gender title
 * @return {object} 201 - Success response - application/json
 * @return {object} 400 - Bad request - application/json
 * @return {object} 409 - Conflict - application/json
 * @example request - Example gender data
 *{
 *  "gender_name": "Science Fiction"
 *}
 * @example response - 201 - Example success response
 {
  "id": 1,
    "gender_name": "Science Fiction",
    "created_at": "2023-07-17T12:11:34.078Z",
    "updated_at": null
 }
 * @example response - 400 - Example bad request
 * {
 *   "message": "Invalid data",
 *   "status": 400
 * }

 * @example response - 409 - Example conflict response
 * {
  * "message": "Le genre existe déjà",
  * "status": 409
 * }
 *  */
router.put('/:id', validator(genderSchemaUpdateSchema), controllerWrapper(genderController.updateGender));

/**
 * Delete /genders/{id}
 * @summary delete a gender by his id
 * @tags genders
 * @param {number} id.path.required - gender id
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - bad request - application/json
 * @return {object} 409 - Conflict - application/json
 * @example response - 200 - example success response

 * {
 * "message": "le  livre a été supprimé avec succée"
 * }
 * @example response - 400 - example success response
 * {
 * "message": "aucun élément trouvé avec l'id: 14"
 * }
 * @example response - 409 - example conflict response
 * {
  "message": "Le genre avec l'id 3 est lié à un ou plusieurs livres et ne peut pas être supprimé",
  "status": 409
*}
 */

router.delete('/:id', controllerWrapper(genderController.deleteGenderById));

module.exports = router;
