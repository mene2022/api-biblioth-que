const express = require('express');

const router = express.Router();
const bookController = require('../controllers/book.controller');
const controllerWrapper = require('../middlewares/wrapperController');
const validator = require('../middlewares/validator');
const bookSchema = require('../schemas/bookCeateSchema');
const bookSchemaUpdate = require('../schemas/bookUpdateSchema');

router.get('/', controllerWrapper(bookController.getBooks));
router.get('/:id', controllerWrapper(bookController.getBookById));
router.post('/', validator(bookSchema), controllerWrapper(bookController.addBook));
router.put('/:id', validator(bookSchemaUpdate), controllerWrapper(bookController.updateBookById));
router.delete('/:id', controllerWrapper(bookController.deleteBookById));

module.exports = router;
