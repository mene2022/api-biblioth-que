const express = require('express');

const router = express.Router();
const commentController = require('../controllers/comment.controller');
const wrapperController = require('../middlewares/wrapperController');
const validator = require('../middlewares/validator');
const commentCreate = require('../schemas/commentCreateSchema');
const commentUpdate = require('../schemas/commentUpdate');

router.get('/', wrapperController(commentController.getComments));
router.get('/:id', wrapperController(commentController.getCommentById));
router.post('/', validator(commentCreate), wrapperController(commentController.addComment));
router.put('/:id', validator(commentUpdate), wrapperController(commentController.updateCommentById));
router.delete('/:id', wrapperController(commentController.deleteCommentById));
module.exports = router;
