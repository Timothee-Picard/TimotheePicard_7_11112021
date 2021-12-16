import recipes from "./recipes.js"

const $inputIngredients = document.getElementById('ingredients')
const $inputUstensiles = document.getElementById('ustensiles')
const $inputAppareil = document.getElementById('appareil')
const $inputRecherche = document.getElementById('recherche')
const $main = document.getElementById('main')

// Récupérer la liste des ingrédients
var ingredientsList = [...new Set(recipes.map((recipe)=> recipe.ingredients.map((ingredientInfo)=> ingredientInfo.ingredient.toUpperCase())).reduce((tabl_1, tabl_2) => tabl_1.concat(tabl_2)))]

// Récupérer la liste des ustensiles
var ustensilesList = [...new Set(recipes.map((recipe)=> recipe.ustensils.map((ustensilsInfo)=> ustensilsInfo.toUpperCase())).reduce((tabl_1, tabl_2) => tabl_1.concat(tabl_2)))]

// Récupérer la liste des appareils
var appareilsList = [...new Set(recipes.map((recipe)=> recipe.appliance.toUpperCase()))]

function displayIngredient(ingList) {
  var result =""
  ingList.forEach((ing)=> result += `<p>${ing.ingredient}<span>${(ing.quantity)?': '+ing.quantity:""}${(ing.unit)?ing.unit:""}</span></p>`)
  return result
}

function displayRecipes(htmlRecipes) {
  $main.innerHTML = ""
  htmlRecipes.forEach(htmlRecipe => {
    var a =""
    $main.innerHTML += `
    <article>
      <img src="" alt="">
      <h2>${htmlRecipe.name}</h2>
      <span><i class="far fa-clock"></i>${htmlRecipe.time} min</span>
      <div>
        ${displayIngredient(htmlRecipe.ingredients)}
        <p>Lait de coco: <span>400ml</span></p>
        <p>Jus de citron: <span>2</span></p>
        <p>Crème de coco: <span>4 cuillères</span></p>
        <p>Sucre: <span>20g</span></p>
        <p>Glaçons: <span>2</span></p>
      </div>
      <div>
        <p>
          ${htmlRecipe.description}
        </p>
      </div>
    </article>`
  });
}

displayRecipes(recipes)

// Barre principale
$inputRecherche.addEventListener('input', (e)=> {
  if(e.target.value.length >= 3) {
    var recette = recipes.filter((rec)=>
      rec.name.toUpperCase().includes(e.target.value.toUpperCase()) ||
      rec.description.toUpperCase().includes(e.target.value.toUpperCase()) || 
      rec.ingredients.filter((ing) => ing.ingredient.toUpperCase().includes(e.target.value.toUpperCase())).length > 0
    )
    console.log(recette);
    displayRecipes(recette)
  }
})

$inputIngredients.addEventListener('input', (e)=> {
  if(e.target.value.length >= 3) {
      //récupérer la liste des ingrédients en fonction de la recherche
      var ingredients = ingredientsList.filter((ing)=> ing.includes(e.target.value.toUpperCase()))
      console.log(ingredients);

      //récupérer la liste des recettes concernées
      var recette = recipes.filter((rec)=> rec.ingredients.filter((ing)=> ing.ingredient.toUpperCase().includes(e.target.value.toUpperCase())).length > 0)
      console.log(recette)
      displayRecipes(recette)
  }
})

$inputUstensiles.addEventListener('input', (e)=> {
  if(e.target.value.length >= 3) {
      //récupérer la liste des ustensiles en fonction de la recherche
      var ustensiles = ustensilesList.filter((ust) => ust.includes(e.target.value.toUpperCase()))
      console.log(ustensiles)

      // récupérer la liste des recettes concernées
      var recette = recipes.filter((rec)=> rec.ustensils.filter((ust)=> ust.toUpperCase().includes(e.target.value.toUpperCase())).length > 0)
      console.log(recette)
      displayRecipes(recette)
  }
})


$inputAppareil.addEventListener('input', (e)=> {
  if(e.target.value.length >= 3) {
      //récupérer la liste de l'appareil en fonction de la recherche
      var appareil = appareilsList.filter((appa)=> appa.includes(e.target.value.toUpperCase()))
      console.log(appareil)

      //récupérer la liste des recettes concernées
      var recette = recipes.filter((rec)=> rec.appliance.toUpperCase().includes(e.target.value.toUpperCase()))
      console.log(recette)
      displayRecipes(recette)
  }
})