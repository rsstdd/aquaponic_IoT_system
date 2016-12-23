'use strict';

exports.up = (knex) => {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('email').notNullable().unique();
    table.string('avatar_url').notNullable().unique();
    table.string('auth_id').notNullable().unique();
    table.string('name').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('users');
};
