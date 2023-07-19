const CoreDatamapper = require('./coredatamapper');
const client = require('../db/pg');

class Loan extends CoreDatamapper {
  tableName = 'loan';

  async findByStatus(value) {
    const preparedQuery = {
      text: `SELECT * FROM "${this.tableName}" WHERE "book_id" = $1`,
      values: [value],
    };
    const resultat = await this.client.query(preparedQuery);

    return resultat.rows;
  }
}

module.exports = new Loan(client);
