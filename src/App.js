import './App.css';
import { useEffect, useState } from 'react'
import Recipe from './components/Recipe';
require('dotenv').config();

function App() {

  // please use your own ID and key
  const API_ID = process.env.REACT_APP_API_ID
  const API_KEY = process.env.REACT_APP_API_KEY
  
  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState('')
  // we create a new state now for the search button, because we don`t want the input to request, we want the button
  const [query, setQuery] = useState('banana')

  const exampleReq = 
    `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${API_ID}&app_key=${API_KEY}`

  useEffect(() => {
    getRecipes();
  }, [query])

  const getRecipes = async () => {
    try {
      const res = await fetch(exampleReq)
      const data = await res.json()
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
          recipes.map((recipe, index) => (
            <Recipe
              key={index}
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
