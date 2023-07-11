const CoreDatamapper = require('./coredatamapper');
const client = require('../db/pg');

class Author extends CoreDatamapper {
  tableName = 'author';
}

module.exports = new Author(client);
