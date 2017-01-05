'use strict';

exports.up = (knex) => {
  return knex.schema.createTable('sensors', (table) => {
    table.increments();
    table.integer('water_temp').notNullable();
    table.integer('air_temp').notNullable();
    table.integer('humidity').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('sensors');
};
