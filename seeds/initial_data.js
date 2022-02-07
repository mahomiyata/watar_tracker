
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('amount_of_water').del()
    .then(function () {
      // Inserts seed entries
      return knex('amount_of_water').insert([
        {amount: 200, created_at: "2021-12-06"},
        {amount: 1000, created_at: "2021-12-07"},
        {amount: 500, created_at: "2021-12-08"},
        {amount: 400, created_at: "2021-12-09"},
        {amount: 500, created_at: "2021-12-10"},
        {amount: 200, created_at: "2021-12-11"},
        {amount: 300, created_at: "2021-12-12"},
        {amount: 350, created_at: "2021-12-13"},
        {amount: 250, created_at: "2021-12-13"},
        {amount: 1000, created_at: "2021-12-14"},
        {amount: 100}
      ]);
    });
};
