const express = require('express');
const router = require('./routers/index');
const applySwagger = require('./utils/apiDocs');

const app = express();
// Appliquer Swagger à l'application Express
applySwagger(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
// app.use(errorHandler);
module.exports = app;
