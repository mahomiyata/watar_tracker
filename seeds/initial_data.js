
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('amount_of_water').del()
    .then(function () {
      // Inserts seed entries
      return knex('amount_of_water').insert([
        {id: 1, amount: 200, created_at: "2021-12-06"},
        {id: 2, amount: 1000, created_at: "2021-12-07"},
        {id: 3, amount: 500, created_at: "2021-12-08"},
        {id: 4, amount: 400, created_at: "2021-12-09"},
        {id: 5, amount: 500, created_at: "2021-12-10"},
        {id: 6, amount: 200, created_at: "2021-12-11"},
        {id: 7, amount: 300, created_at: "2021-12-12"}
      ]);
    });
};
