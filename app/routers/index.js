const express = require('express');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const authorRoutes = require('./authorRoutes');
const genderRoutes = require('./genderRoutes');
const bookRoutes = require('./bookRoutes');
const bookGenderRoutes = require('./bookGenderRoutes');
const ratingRoutes = require('./raitingRoutes');
const errorHandler = require('../utils/errorHandler');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/authors', authorRoutes);
router.use('/genders', genderRoutes);
router.use('/books', bookRoutes);
router.use('/book-genders', bookGenderRoutes);
router.use('/ratings', ratingRoutes);
router.use(errorHandler);
module.exports = router;
