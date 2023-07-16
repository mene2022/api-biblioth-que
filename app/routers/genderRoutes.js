const express = require('express');

const router = express.Router();
const genderController = require('../controllers/gender.controller');
const controllerWrapper = require('../middlewares/wrapperController');
const genderCreateSchema = require('../schemas/genderCreateSchema');
const genderSchemaUpdateSchema = require('../schemas/genderUpdateSchema');
const validator = require('../middlewares/validator');

router.get('/', controllerWrapper(genderController.getGenders));
router.post('/', validator(genderCreateSchema), controllerWrapper(genderController.addGender));
router.get('/:id', controllerWrapper(genderController.getGenderById));
router.put('/:id', validator(genderSchemaUpdateSchema), controllerWrapper(genderController.updateGender));
router.delete('/:id', controllerWrapper(genderController.deleteGenderById));

module.exports = router;
