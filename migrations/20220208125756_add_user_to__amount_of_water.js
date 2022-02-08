exports.up = function (knex) {
  return knex.schema.alterTable("amount_of_water", function (table) {
    table.integer("user_id");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("amount_of_water", function (table) {
    table.dropColumn("user_id");
  });
};
