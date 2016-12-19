'use strict';

exports.up = (knex) => {
  return knex.schema.createTable('sensors', (table) => {
    table.increments();
    table.integer('h20Temp').notNullable();
    table.integer('atmoTemp').notNullable();
    table.integer('rHumidity').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('sensors');
};
