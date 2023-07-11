const debug = require('debug')('sql:log');

const { Pool } = require('pg');

const pool = new Pool();

module.exports = {

  originalCLient: pool,

  async query(...params) {
    debug(...params);
    return this.originalCLient.query(...params);
  },

};
