import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('users', (table) => {
    table.string('role', 20).notNullable().defaultTo('user');
    table.string('password_hash', 255).nullable(); // nullable — у существующих юзеров пароля нет
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('users', (table) => {
    table.dropColumn('role');
    table.dropColumn('password_hash');
  });
}