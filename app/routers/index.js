const express = require('express');
const authRoutes = require('./authRoutes');

const errorHandler = require('../utils/errorHandler');

const router = express.Router();

router.use('/auth', authRoutes);

router.use(errorHandler);
module.exports = router;
