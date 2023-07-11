const CoreDatamapper = require('./coredatamapper');
const client = require('../db/pg');

class Loan extends CoreDatamapper {
  tableName = 'loan';
}

module.exports = new Loan(client);
