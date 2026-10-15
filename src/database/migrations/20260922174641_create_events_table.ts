import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('events', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable(); 
    table.timestamp('start_time').notNullable(); 
    table
      .string('status')
      .notNullable()
      .defaultTo('scheduled'); 
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('events');
}