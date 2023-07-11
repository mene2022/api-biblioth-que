// eslint-disable-next-line no-unused-vars
const express = require('express');

// eslint-disable-next-line no-undef
const router = express.Router();
const auth = require('../controllers/auth');
const userCreateSchema = require('../schemas/userCreateSchema');
const userValidator = require('../middlewares/userValidator');

router.post('/', userValidator(userCreateSchema), auth.signup); // userValidator(userCreateSchema),

module.exports = router;
