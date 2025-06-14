exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('full_name').notNullable();
    table.string('email').unique().notNullable();
    table.string('phone').notNullable();
    table.string('password_hash').notNullable();
    table.enum('role', ['admin', 'student']).defaultTo('student');
    table.boolean('is_blocked').defaultTo(false);
    table.boolean('free_test_used').defaultTo(false);
    table.integer('test_attempts').defaultTo(0);
    table.integer('max_test_attempts').defaultTo(1);
    table.json('allowed_directions').defaultTo('[]');
    table.text('bio');
    table.string('profile_image_url');
    table.timestamps(true, true);
    
    table.index(['email']);
    table.index(['role']);
    table.index(['is_blocked']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};