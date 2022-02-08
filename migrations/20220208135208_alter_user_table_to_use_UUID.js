exports.up = function (knex) {
  return knex.schema.alterTable("users", function (table) {
    table.string("uuid");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("users", function (table) {
    table.dropColumn("uuid");
  });
};
