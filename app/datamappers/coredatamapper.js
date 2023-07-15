class CoreDatamapper {
  tableName;

  constructor(client) {
    this.client = client;
  }

  async findByPk(id) {
    const preparedQuery = {
      text: `SELECT * FROM "${this.tableName}" WHERE id = $1`,
      values: [id],
    };

    const result = await this.client.query(preparedQuery);

    if (!result.rows[0]) {
      return null;
    }

    return result.rows[0];
  }

  async findAll() {
    const result = await this.client.query(`SELECT * FROM "${this.tableName}"`);
    return result.rows;
  }

  async create(inputData) {
    const columns = Object.keys(inputData);
    const values = Object.values(inputData);

    const preparedQuery = {
      text: `
                INSERT INTO "${this.tableName}"
                (${columns.map((c) => `"${c}"`).join(', ')})
                VALUES (${values.map((_, i) => `$${i + 1}`).join(', ')})
                RETURNING *
            `,
      values,
    };

    const result = await this.client.query(preparedQuery);
    return result.rows[0];
  }

  async update({ id }, inputData) {
    const columns = Object.keys(inputData);
    const values = Object.values(inputData);
    values.push(id);

    const setClause = columns.map((col, index) => `"${col}" = $${index + 1}`).join(', ');

    const preparedQuery = {
      text: `
            UPDATE "${this.tableName}"
            SET ${setClause}, updated_at = now()
            WHERE id = $${columns.length + 1}
            RETURNING *
          `,
      values,
    };

    const result = await this.client.query(preparedQuery);
    return result.rows[0];
  }

  async delete(id) {
    const result = await this.client.query(`DELETE FROM "${this.tableName}" WHERE id = $1`, [id]);
    return !!result.rowCount;
  }

  async count() {
    const result = await this.client.query(`SELECT COUNT(*) FROM ${this.tableName}`);
    // eslint-disable-next-line radix
    const count = parseInt(result.rows[0].count);
    return count;
  }

  async isUnique(column, value) {
    const preparedQuer = {
      text: `SELECT * FROM "${this.tableName}" WHERE ${column} =$1`,
      values: [value],
    };
    const res = await this.client.query(preparedQuer);
    return res.rows[0];
  }

  async findByEmeail(email) {
    const preparedQuery = {
      text: `SELECT * FROM "${this.tableName}" WHERE "user_email"=$1`,
      values: [email],
    };
    const result = await this.client.query(preparedQuery);
    if (!result) {
      return null;
    }
    return result.rows[0];
  }
}

module.exports = CoreDatamapper;
