const CoreDatamapper = require('./coredatamapper');
const client = require('../db/pg');

class Author extends CoreDatamapper {
  tableName = 'author';

  async authorExisting(data) {
    const columns = Object.keys(data);
    const values = Object.values(data);

    // Construire la clause WHERE de la requête SQL
    const whereClause = columns.map((column, index) => `"${column}" = $${index + 1}`).join(' AND ');

    const preparedQuery = {
      text: `SELECT * FROM "${this.tableName}" WHERE ${whereClause}`,
      values,
    };

    const result = await this.client.query(preparedQuery);

    if (!result.rows[0]) {
      return null;
    }

    return result.rows[0];
  }
}

module.exports = new Author(client);
