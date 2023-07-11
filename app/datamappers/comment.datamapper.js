const CoreDatamapper = require('./coredatamapper');
const client = require('../db/pg');

class Comment extends CoreDatamapper {
  tableName = 'comment';
}

module.exports = new Comment(client);
