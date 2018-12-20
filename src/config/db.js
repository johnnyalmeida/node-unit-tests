let config = null;

const database = process.env.NODE_TEST_ENV === 'true' ? `test_${process.env.DB_DATABASE}` : process.env.DB_DATABASE;

if (typeof global.database === 'object') {
  config = global.database;
} else {
  config = {
    client: 'mysql2',
    debug: false,
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database,
      supportBigNumbers: true,
      bigNumberStrings: true,
      multipleStatements: true,
      timezone: 'UTC',
      dateStrings: true,
    },
    pool: {
      min: parseInt(process.env.DB_POOL_MIN || 0, 10),
      max: parseInt(process.env.DB_POOL_MAX || 1, 10),
    },
  };
}

// main connections
const main = require('knex')(config);

module.exports = {
  knex: main,
  raw: main.raw, // alias to knex.raw
};
