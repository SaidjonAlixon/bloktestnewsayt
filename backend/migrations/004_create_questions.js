exports.up = function(knex) {
  return knex.schema.createTable('questions', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.text('text').notNullable();
    table.json('options').notNullable(); // {A: "option1", B: "option2", C: "option3", D: "option4"}
    table.enum('correct_answer', ['A', 'B', 'C', 'D']).notNullable();
    table.string('image_url');
    table.decimal('points', 3, 1).notNullable();
    table.enum('difficulty', ['easy', 'medium', 'hard']).defaultTo('medium');
    table.integer('wrong_answer_count').defaultTo(0);
    table.uuid('subject_id').references('id').inTable('subjects').onDelete('CASCADE');
    table.timestamps(true, true);
    
    table.index(['subject_id']);
    table.index(['difficulty']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('questions');
};