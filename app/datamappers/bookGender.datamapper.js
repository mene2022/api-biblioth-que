const CoreDatamapper = require('./coredatamapper');
const client = require('../db/pg');

class BookGender extends CoreDatamapper {
  tableName = 'book_gender';

  async linkExists(valone, valtwo) {
    const preparedQuery = {
      text: `SELECT * FROM "${this.tableName}" WHERE "book_id" =$1 AND "gender_id"=$2`,
      values: [valone, valtwo],
    };
    const result = await this.client.query(preparedQuery);
    if (!result.rows[0]) {
      return null;
    }

    return result.rows[0];
  }
}

module.exports = new BookGender(client);
