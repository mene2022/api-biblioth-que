const express = require('express');
const validator = require('../middlewares/validator');

const router = express.Router();
const userController = require('../controllers/user.controller');
const wrapperController = require('../middlewares/wrapperController');
const userUpdateSchema = require('../schemas/userUpdateSchema');

router.get('/', wrapperController(userController.getUsers));
router.get('/:id', wrapperController(userController.getUserById));
router.put('/:id', validator(userUpdateSchema), wrapperController(userController.unpdateUserById));
router.delete('/:id', wrapperController(userController.deleteUserById));

module.exports = router;
