exports.up = function(knex) {
  return knex.schema.createTable('subjects', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('name').notNullable();
    table.enum('type', ['main', 'mandatory']).notNullable();
    table.integer('question_count').defaultTo(10);
    table.decimal('points_per_question', 3, 1).defaultTo(1.0);
    table.uuid('direction_id').references('id').inTable('directions').onDelete('CASCADE');
    table.timestamps(true, true);
    
    table.index(['direction_id']);
    table.index(['type']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('subjects');
};