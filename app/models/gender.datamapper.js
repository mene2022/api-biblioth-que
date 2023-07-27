const CoreDatamapper = require('./coredatamapper');
const client = require('../db/pg');

class Gender extends CoreDatamapper {
  tableName = 'gender';

  async isGenreRelatedToBook(id) {
    const preparedQuery = {
      text: 'SELECT EXISTS(SELECT 1 FROM "book_gender" WHERE "book_gender".gender_id=$1)',
      values: [id],
    };
    const result = await this.client.query(preparedQuery);

    return result.rows[0].exists;
  }
}

module.exports = new Gender(client);
