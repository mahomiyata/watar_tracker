
exports.up = function(knex) {
  return knex.schema.withSchema('public').createTable('amount_of_water', function (table) {
    table.increments();
    table.integer('amount');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('amount_of_water');
};
