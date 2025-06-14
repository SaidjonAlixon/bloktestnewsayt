exports.up = function(knex) {
  return knex.schema.createTable('test_sessions', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.uuid('direction_id').references('id').inTable('directions').onDelete('CASCADE');
    table.timestamp('start_time').defaultTo(knex.fn.now());
    table.timestamp('end_time');
    table.json('answers'); // {questionId: "A", questionId2: "B", ...}
    table.decimal('total_score', 5, 1).defaultTo(0);
    table.boolean('is_paid').defaultTo(false);
    table.integer('time_left').defaultTo(10800); // 3 hours in seconds
    table.json('cheating_flags').defaultTo('[]');
    table.string('ip_address');
    table.enum('status', ['active', 'completed', 'abandoned']).defaultTo('active');
    table.timestamps(true, true);
    
    table.index(['user_id']);
    table.index(['direction_id']);
    table.index(['status']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('test_sessions');
};