exports.up = function(knex) {
  return knex.schema.createTable('payments', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.uuid('direction_id').references('id').inTable('directions').onDelete('CASCADE');
    table.integer('amount').notNullable();
    table.enum('status', ['pending', 'confirmed', 'rejected']).defaultTo('pending');
    table.string('payment_method');
    table.string('transaction_id');
    table.json('payment_details');
    table.timestamps(true, true);
    
    table.index(['user_id']);
    table.index(['status']);
    table.index(['created_at']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('payments');
};