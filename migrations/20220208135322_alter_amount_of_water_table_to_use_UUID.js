exports.up = function (knex) {
  return knex.schema.alterTable("amount_of_water", function (table) {
    table.dropColumn("user_id");
    table.string("user_uuid");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("users", function (table) {
    table.dropColumn("user_uuid");
    table.integer("user_id");
  });
};
