const express = require('express');
const router = require('./routers/index');
// const errorHandler = require('./utils/errorHandler');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
// app.use(errorHandler);
module.exports = app;
