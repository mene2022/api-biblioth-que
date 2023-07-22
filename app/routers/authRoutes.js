// eslint-disable-next-line no-unused-vars
const express = require('express');
const controllerWrapper = require('../middlewares/wrapperController');
// eslint-disable-next-line no-undef
const router = express.Router();
const auth = require('../controllers/auth.controller');
const userCreateSchema = require('../schemas/userCreateSchema');
const validator = require('../middlewares/validator');
const userLogin = require('../schemas/userLoginSchema');
/**
 * Post /auth/signup
 * @tags auth
 * @summary Create a new user
 * @param {object}  request.body.required - user data to create
 * @property {string} request.body.user_name.required - User name
 * @property {string} request.body.user_email.required - User email
 * @property {string} request.body.user_password.required - User password
 * @property {string} request.body.user_role.required - User role - enum:["utilisateur", "admin"]
 * @return {object} 201 - success response  - application/json
 * @return {object} 409 - Conflict - application/json
 * @return {object} 400 - bad request - application/json
 * @example request - example user data
 *  {
 *   "user_name": "John Doe",
 *   "user_email": "john.doe@example.com",
 *   "user_password": "password123",
 *   "user_role": "utilisateur"
 * }
 * @example response - 201 - example success response
 * {
 *   "userId": 1,
 *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCSflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 * }
 * @example response - 409 - example conflict response
 *  {
 *   "message": "L'email m@yahoo.fr existe déjà",
 *   "status": 409
 * }
 *  @example response - 400 - example bad request
 * {
 *   "message": "Invalid data",
 *   "status": 400
 * }
 */
router.post('/signup', validator(userCreateSchema), controllerWrapper(auth.signup));
/**
 * POST /auth/login
 * @tags auth
 * @summary login
 * @param {object} request.body.required - User data for identification
 * @property {string} request.body.user_email.required - User email
 * @property {string} request.body.user_password.required - User password
 * @return {object} 200 - Success response - application/json
 * @return {object} 404 - Not Found - application/json
 * @return {object} 401 - Unauthorized - application/json
 * @example request - Example user login data
 * {
 *   "user_email": "user@example.com",
 *   "user_password": "userpassword"
 * }
 * @example response - 200 - Example success response
 * {
 *   "userId": 1,
 *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCSflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 * }
 * @example response - 404 - Not Found example
 * {
 *   "message": "User does not exist",
 *   "status": 404
 * }
 * @example response - 401 - Unauthorized example
 * {
 *   "message": "Incorrect password",
 *   "status": 401
 * }
 */

router.post('/login', validator(userLogin), controllerWrapper(auth.login));

module.exports = router;
