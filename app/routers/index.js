const express = require('express');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const authorRoutes = require('./authorRoutes');
const genderRoutes = require('./genderRoutes');
const bookRoutes = require('./bookRoutes');
const bookGenderRoutes = require('./bookGenderRoutes');
const ratingRoutes = require('./raitingRoutes');
const loanRoutes = require('./loanRoutes');
const commentRoutes = require('./commentRoutes');
// const errorHandler = require('../utils/errorHandler');
const NotFoundError = require('../error/notFoundError');

const router = express.Router();

router.use('/auth', authRoutes);

/**
 * Use /users
 * @description Routes for user operations
 */
router.use('/users', userRoutes);

router.use('/authors', authorRoutes);
router.use('/genders', genderRoutes);
router.use('/books', bookRoutes);
router.use('/book-genders', bookGenderRoutes);
router.use('/ratings', ratingRoutes);
router.use('/loans', loanRoutes);
router.use('/comments', commentRoutes);
router.use(() => {
  throw new NotFoundError('La route n existe pas');
});
// router.use(errorHandler);
module.exports = router;
