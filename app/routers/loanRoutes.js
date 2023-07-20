const express = require('express');

const router = express.Router();
const loanController = require('../controllers/loan.contoller.');
const contollerWrapper = require('../middlewares/wrapperController');
const loanCreateSchema = require('../schemas/loanCreateSchema');
const loanSchemaUpdate = require('../schemas/loanUpdateSchema');
const validator = require('../middlewares/validator');

router.get('/', contollerWrapper(loanController.getLoans));
router.get('/:id', contollerWrapper(loanController.getLoanById));
router.post('/', validator(loanCreateSchema), contollerWrapper(loanController.addLoan));
router.put('/:id', validator(loanSchemaUpdate), contollerWrapper(loanController.updateLoanById));
router.delete('/:id', contollerWrapper(loanController.deleteLoanById));
module.exports = router;
