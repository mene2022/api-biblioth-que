const CoreDatamapper = require('./coredatamapper');
const client = require('../db/pg');

class Book extends CoreDatamapper {
  tableName = 'book';

  async bookExists(valone, valtwo, valthree, valfor) {
    const preparedQuery = {
      text: `SELECT * FROM "${this.tableName}" WHERE "book_summary" =$1 AND "title"=$2 AND "publication_year"=$3 AND "author_id"=$4`,
      values: [valone, valtwo, valthree, valfor],
    };
    const result = await this.client.query(preparedQuery);
    if (!result.rows[0]) {
      return null;
    }

    return result.rows[0];
  }
}

module.exports = new Book(client);
