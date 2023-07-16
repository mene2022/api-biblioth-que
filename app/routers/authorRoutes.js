const express = require('express');

const router = express.Router();
const validator = require('../middlewares/validator');
const authorCreate = require('../schemas/authorCreateSchema');
const authorController = require('../controllers/author.controller');
const wrapperController = require('../middlewares/wrapperController');
const authorUpdate = require('../schemas/authorUpdateSechma');

router.get('/', wrapperController(authorController.getAuhors));
router.get('/:id', wrapperController(authorController.getAuhorById));
router.post('/', validator(authorCreate), wrapperController(authorController.addAuthor));
router.put('/:id', validator(authorUpdate), wrapperController(authorController.updateAuhorById));
router.delete('/:id', wrapperController(authorController.deleteAuthorById));
module.exports = router;
