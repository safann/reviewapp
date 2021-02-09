const knex = require('knex')(require('./knexfile'))

module.exports = {
  createUser: ({ username, password }) => {
    console.log(`Add user ${username} with password ${password}`)
    return Promise.resolve()
  },
  searchRecipe: async (query, preptimemax) => {

    let rows = await knex.from('recipe').select("*")
      .where('title', 'like', `%${query}%`)
      .whereBetween('preptime', [0, preptimemax])
    for (let row of rows) {
      row.ingredients = row.ingredients.split(";")
    }
    return rows
  },
  deleteRecipe: (id) => {
    return knex('recipe').where('id', id).del()
  },
  createRecipe: (recipe) => {
    return knex('recipe').insert({
      createdby: "",
      title: recipe?.title,
      ingredients: recipe?.ingredients?.join(";"),
      calories: recipe?.calories,
      preptime: recipe?.preptime
    })
  }
}


