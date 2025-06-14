exports.up = function(knex) {
  return knex.schema.createTable('test_results', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('test_session_id').references('id').inTable('test_sessions').onDelete('CASCADE');
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.uuid('direction_id').references('id').inTable('directions').onDelete('CASCADE');
    table.decimal('total_score', 5, 1).notNullable();
    table.json('subject_scores'); // {subjectName: {score: 10.5, correct: 5, total: 10}}
    table.integer('correct_answers').notNullable();
    table.integer('total_questions').notNullable();
    table.integer('time_spent'); // in seconds
    table.integer('rank');
    table.decimal('percentile', 5, 2);
    table.timestamps(true, true);
    
    table.index(['user_id']);
    table.index(['direction_id']);
    table.index(['total_score']);
    table.index(['created_at']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('test_results');
};