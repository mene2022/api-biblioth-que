// eslint-disable-next-line no-unused-vars
const express = require('express');
const controllerWrapper = require('../middlewares/wrapperController');
// eslint-disable-next-line no-undef
const router = express.Router();
const auth = require('../controllers/auth');
const userCreateSchema = require('../schemas/userCreateSchema');
const validator = require('../middlewares/validator');
const userLogin = require('../schemas/userLoginSchema');

router.post('/signup', validator(userCreateSchema), controllerWrapper(auth.signup)); // userValidator(userCreateSchema),
router.post('/login', validator(userLogin), controllerWrapper(auth.login));

module.exports = router;
