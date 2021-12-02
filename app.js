import recipes from "./recipes.js"

const input = document.getElementById('input');
const result = document.getElementById('result');


// Récupérer la liste des ingrédients
var ingredientsList = []
recipes.forEach((recipe)=> {
    recipe.ingredients.forEach((ingredientInfo)=> {
        ingredientsList.push(ingredientInfo.ingredient.toUpperCase())
    })
})
ingredientsList = [...new Set(ingredientsList)]



input.addEventListener('input', (e)=> {
    if(e.target.value.length >= 3) {
        result.innerHTML = e.target.value;
        
        var test = []
        ingredientsList.forEach((ing)=> {
            console.log(ing.includes(e.target.value))
            
        })

        console.log([...new Set(test)])
    }
});
