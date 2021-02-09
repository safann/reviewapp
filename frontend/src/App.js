// import logo from './logo.svg';
import React, { useEffect, useState } from "react";
import Recipe from './Recipe';
import SearchAppBar from './SearchAppBar'
import './App.css';
import {
  Button,
  Card,
  IconButton,
  InputBase,
  makeStyles,
  Paper,
  TextField
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import validate from 'validate.js';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '5vw',
    [theme.breakpoints.up('sm')]: {
      padding: 20,
    },
  },
  form: {
    padding: '25%',
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
    padding: '10%',
    marginBottom: 20,
  },
  list: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  card: {
    width: "40vw",
    height: "max-content",
    marginBottom: 20,
  },
  addIngredientInput: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));


const Recipes = ({ recipes, showAddRecipeUI }) => {
  const classes = useStyles()
  const [title, setTitle] = useState()
  const [ingredientToAdd, setIngredientToAdd] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [calories, setCalories] = useState(0)
  const [preptime, setPreptime] = useState(0)

  const createRecipe = async () => {
    // make api call
    await fetch(`http://localhost:7555/recipe`, {
      method: "POST",
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        ingredients: ingredients,
        calories: calories,
        preptime: preptime,
        createdby: ""
      })
    })
  }

  const deleteRecipe = async (idToDelete) => {
    await fetch(`http://localhost:7555/recipe/${idToDelete}`, {
      method: "DELETE",
      mode: 'cors',
    })
  }

  const removeIngredient = (indexToDelete) => () => {
    const remainingIngredients = ingredients.filter((_, index) => indexToDelete !== index)
    setIngredients(remainingIngredients)
  }

  const addIngredient = (text) => {
    if (text !== "") {
      setIngredients([
        ...ingredients,
        text
      ])
      setIngredientToAdd('')
    }
  }

  const addTitle = (event) => {
    setTitle(event.target.value)
  }

  const handleCalorieChange = (event) => {
    setCalories(event.target.value)
  }

  const handlePreptimeChange = (event) => {
    setPreptime(event.target.value)
  }

  const handleIngredientToAddChange = (event) => {
    setIngredientToAdd(event.target.value)
  }

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      addIngredient(event.target.value)
    }
  }

  const validationErrors = validate({
    ingredients,
    title,
    calories,
    preptime,
  }, {
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
        greaterThan: 0
      }
    },
    preptime: {
      presence: true,
      numericality: {
        greaterThan: 0,
        lessThanOrEqualTo: 168
      }
    }
  })

  return (
    <div className={classes.root}>
      {
        showAddRecipeUI &&
        <Card className={classes.form}>
          <TextField
            id="title"
            error={validationErrors?.title}
            label="Title"
            variant="outlined"
            onChange={addTitle} />
          {ingredients.map((ingredient, index) => (
            <div key={ingredient}>
              {ingredient}
              <IconButton onClick={removeIngredient(index)}>
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
          <Paper className={classes.addIngredientInput}>
            <InputBase
              placeholder="Add ingredient"
              onChange={handleIngredientToAddChange}
              onKeyDown={handleEnter}
              value={ingredientToAdd}
            />
            <IconButton className={classes.iconButton} onClick={() => addIngredient(ingredientToAdd)}>
              <AddIcon />
            </IconButton>
          </Paper>
          <TextField
            id="calories"
            type="number"
            error={validationErrors?.calories}
            label="Calories"
            variant="outlined"
            value={calories}
            onChange={handleCalorieChange} />
          <TextField
            id="preptime"
            type="number"
            error={validationErrors?.preptime}
            label="Preptime"
            variant="outlined"
            value={preptime}
            onChange={handlePreptimeChange} />
          <Button disabled={validationErrors} onClick={createRecipe}>Create</Button>
        </Card>
      }

      <div className={classes.list}>
        {
          recipes.map(recipe => (
            <Recipe
              deleteFunction={() => deleteRecipe(recipe.id)}
              classes={classes}
              key={recipe.title}
              title={recipe.title}
              calories={recipe.calories}
              ingredients={recipe.ingredients} />
          ))
        }
      </div>
    </div >
  )
}

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState('');
  const [showAddRecipeUI, setShowAddRecipeUI] = useState(false);

  useEffect(() => {
    handleSearch()
  }, [])

  const handleSearch = async (e) => {
    e?.preventDefault()
    // const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const response = await fetch(`http://localhost:7555/search?q=${query}&preptimemax=1000`);
    const data = await response.json();
    setRecipes(data);
  }

  const handleSearchChange = (event) => {
    setQuery(event.target.value)
  }

  const toggleAddRecipeUI = () => {
    setShowAddRecipeUI(!showAddRecipeUI)
  }

  return (
    <div className="App">
      {/* <form onSubmit={getRecipes} className="search-form">
        <input className="search-bar" type="text" value={query} onChange={e => setQuery(e.target.value)} />
        <button className="search-button" type="submit">Search</button>
        {query !== "" && <button onClick={clearSearch}>x</button>}
        <button className="search-button" type="Add">Add</button>
      </form> */}
      <SearchAppBar
        toggleAddRecipeUI={toggleAddRecipeUI}
        searchValue={query}
        onChange={handleSearchChange}
        onSearch={handleSearch}
        clearSearch={() => setQuery('')}
      />
      <Recipes className="app" recipes={recipes} showAddRecipeUI={showAddRecipeUI} />
    </div>
  );
}

export default App;
