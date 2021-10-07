import './App.css';
import { useEffect, useState } from 'react'
import Recipe from './components/Recipe';
require('dotenv').config();

console.log(process.env)

function App() {

  const APP_ID = process.env.APP_ID
  const APP_KEY = process.env.APP_KEY
  
  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState('')
  // we create a new state now for the search button, because we don`t want the input to request, we want the button
  const [query, setQuery] = useState('banana')

  const exampleReq = 
    `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`

  useEffect(() => {
    console.log('Requesting API')
    getRecipes();
  }, [query])

  const getRecipes = async () => {
    try {
      const res = await fetch(exampleReq)
      const data = await res.json()
      console.log(data.hits)
      setRecipes(data.hits);
    }
    catch (err) {
      console.log(err)
    }
  }

  const updateSearch = e => {
    setSearch(e.target.value)
    console.log(search)
  }

  const getSearch = e => {
    e.preventDefault()
    setQuery(search)
    setSearch('')
  }
  
  return (
    <div className="App">
      <h1>Recipe-O-Nator</h1>
      <form onSubmit={getSearch} className='search-form'>
        <input className='search-bar' type="text" onChange={updateSearch} value={search}/>
        <button className='search-button' type='submit'>Submit</button>
      </form>
      <div className='recipes'>
        {
          recipes.map(recipe => (
            <Recipe
              key={recipe.recipe.label}
              title={recipe.recipe.label}
              calories={recipe.recipe.calories}
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
            />
          ))
        }
      </div>
    </div>
  );
}

export default App;
