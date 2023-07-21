const CoreDatamapper = require('./coredatamapper');
const client = require('../db/pg');

class Gender extends CoreDatamapper {
  tableName = 'gender';
}

module.exports = new Gender(client);
