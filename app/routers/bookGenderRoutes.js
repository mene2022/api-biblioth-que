const express = require('express');

const router = express.Router();
const controllerBookGender = require('../controllers/bookGender.contoller');
const controllerWrapper = require('../middlewares/wrapperController');
const bookGenderSchema = require('../schemas/bookGenderCreateSchema');
const validator = require('../middlewares/validator');

router.get('/', controllerWrapper(controllerBookGender.getBookGenders));
router.post('/', validator(bookGenderSchema), controllerWrapper(controllerBookGender.addBookGender));
router.get('/:id', controllerWrapper(controllerBookGender.getBookGenderById));
router.delete('/:id', controllerWrapper(controllerBookGender.deleteBookGenderById));

module.exports = router;
