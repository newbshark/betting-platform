import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('bets', (table) => {
    table.increments('id').primary();
    table
      .integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table
      .integer('outcome_id')
      .notNullable()
      .references('id')
      .inTable('outcomes')
      .onDelete('CASCADE');
    table.decimal('stake', 14, 2).notNullable();
    table.decimal('odds', 10, 2).notNullable(); 
    table.decimal('potential_payout', 14, 2).notNullable();
    table
      .string('status')
      .notNullable()
      .defaultTo('PENDING'); 
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('bets');
}