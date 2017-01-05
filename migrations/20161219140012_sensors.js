'use strict';

exports.up = (knex) => {
  return knex.schema.createTable('sensors', (table) => {
    table.increments();
    table.integer('waterTemp').notNullable();
    table.integer('airTemp').notNullable();
    table.integer('humidity').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('sensors');
};
