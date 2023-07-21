const CoreDatamapper = require('./coredatamapper');
const client = require('../db/pg');

class Rating extends CoreDatamapper {
  tableName = 'rating';
}

module.exports = new Rating(client);
