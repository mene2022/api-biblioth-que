// eslint-disable-next-line import/no-extraneous-dependencies
const expressJSDocSwagger = require('express-jsdoc-swagger');

const options = {
  info: {
    version: '1.0.0',
    title: 'Api',
    description: "Gérer la réseravation d'un bibilithèque",
    license: {
      name: 'MIT',
    },
  },
  baseDir: __dirname,
  filesPattern: ['../routers/**/*.js', '../errors/*.js', '../models/*.js'],
  swaggerUIPath: '/api-docs',
  exposeSwaggerUI: true,
  exposeApiDocs: true,
  apiDocsPath: '/v3/api-docs',
};

module.exports = (app) => expressJSDocSwagger(app)(options);
