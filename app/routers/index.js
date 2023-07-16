const express = require('express');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const authorRoutes = require('./authorRoutes');
const genderRoutes = require('./genderRoutes');
const errorHandler = require('../utils/errorHandler');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/authors', authorRoutes);
router.use('/genders', genderRoutes);
router.use(errorHandler);
module.exports = router;
