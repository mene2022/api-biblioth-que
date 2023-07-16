const express = require('express');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const errorHandler = require('../utils/errorHandler');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use(errorHandler);
module.exports = router;
