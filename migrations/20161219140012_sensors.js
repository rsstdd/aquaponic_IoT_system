'use strict';

exports.up = (knex) => {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('first_name').notNullable().defaultTo('');
    table.string('last_name').notNullable().defaultTo('');
    table.string('email').unique().notNullable();
    table.integer('gID').notNullable();
    table.string('linkedin_token').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('users');
};
