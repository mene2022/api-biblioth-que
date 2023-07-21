const CoreDatamapper = require('./coredatamapper');
const client = require('../db/pg');

class Book extends CoreDatamapper {
  tableName = 'book';
}

module.exports = new Book(client);
