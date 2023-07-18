const express = require('express');

const router = express.Router();
const validator = require('../middlewares/validator');
const ratingController = require('../controllers/rating.controller');
const ratingSchema = require('../schemas/ratingCreateSchema');
const ratingSchemaUpdate = require('../schemas/ratingSchemeUpdate');
const wrapperController = require('../middlewares/wrapperController');

router.get('/', wrapperController(ratingController.getRatigs));
router.get('/:id', wrapperController(ratingController.getRatigById));
router.post('/', validator(ratingSchema), wrapperController(ratingController.addRating));
router.put('/:id', validator(ratingSchemaUpdate), wrapperController(ratingController.updatedRating));
router.delete('/:id', wrapperController(ratingController.deleteRating));
module.exports = router;
