
exports.up = function (knex) {
  return knex.schema.createTable('recipe', function (t) {
    t.increments('id').primary()
    t.string('title').notNullable()
    t.string('ingredients').notNullable()
    t.integer('calories').notNullable()
    t.integer('preptime').notNullable()
    t.string('createdby').notNullable()
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('recipe')
};
