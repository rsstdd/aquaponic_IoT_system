'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/aqua_dev'
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/aqua_test'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
