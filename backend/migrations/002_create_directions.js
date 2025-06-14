exports.up = function(knex) {
  return knex.schema.createTable('directions', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('name').notNullable();
    table.text('description');
    table.boolean('is_active').defaultTo(true);
    table.boolean('is_free').defaultTo(false);
    table.integer('price').defaultTo(0);
    table.json('test_window');
    table.timestamps(true, true);
    
    table.index(['is_active']);
    table.index(['is_free']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('directions');
};