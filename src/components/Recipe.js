import React from 'react'
import style from './recipe.module.css'

function Recipe({title, calories, image, ingredients}) {
    return (
        <div className={style.recipe}>
            <h2>{title}</h2>
            <img className={style.image} src={image} alt="" />
            <p>Calories - {Math.floor(calories)}</p>
            <div>
                <p>Ingredients</p>
                <ol className={style.ing}>
                    {ingredients.map(ingredient => (
                        <li>{ingredient.text}</li>
                    ))}
                </ol>
            </div>
        </div>
    )
}

export default Recipe
