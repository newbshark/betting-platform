import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('outcomes', (table) => {
    table.increments('id').primary();
    table
      .integer('event_id')
      .notNullable()
      .references('id')
      .inTable('events')
      .onDelete('CASCADE'); 
    table.string('name').notNullable(); 
    table.decimal('odds', 10, 2).notNullable(); 
    table
      .string('status')
      .notNullable()
      .defaultTo('open');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('outcomes');
}
