const express = require("express")
const bodyParser = require('body-parser')
const cors = require('cors')
const store = require('./store.js')
var validate = require("validate.js")

const app = express()
app.use(bodyParser.json())
app.use(cors())

// app.get('/', (req, res) => {
// API
// })
app.post('/createUser', (req, res) => {
  store
    .createUser({
      username: req.body.username,
      password: req.body.password
    })
    .then(() => res.sendStatus(200))
})

// Create new recipe
app.post('/recipe/', async (req, res) => {

  let errors = validate(req.body, {
    title: {
      presence: true,
      length: {
        minimum: 1,
        message: "input title"
      }
    },
    ingredients: {
      presence: true,
      length: {
        minimum: 1,
        message: "input ingredients"
      }
    },
    calories: {
      presence: true,
      numericality: {
        greaterThanOrEqualTo: 0
      }
    },
    createdby: {
      presence: true,
    },
    preptime: {
      presence: true,
      numericality: {
        greaterThanOrEqualTo: 0,
        lessThanOrEqualTo: 168
      }
    }
  })
  if (errors) {
    res.status(400).send(errors)
  }
  await store.createRecipe(req.body)
  res.status(204).end()
})

app.delete('/recipe/:id', async (req, res) => {
  let id = req.params.id
  if (parseInt(id) === NaN) {
    res.status(400).send("Must be a number")
  }
  await store.deleteRecipe(id)
  res.status(200).end()
})

app.get('/search', async (req, res) => {
  let query = req.query.q
  let preptimemax = req.query.preptimemax
  let searchResult = await store.searchRecipe(query, preptimemax)
  res.status(200).send(searchResult)
})

app.listen(7555, () => {
  console.log('Server running on http://localhost:7555')
})
