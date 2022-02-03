import recipes from "./recipes.js"

import Tag from "./model/Tag.js"
import Recipe from "./model/Recipe.js"


var recipesList = recipes.map((recipe) => new Recipe(recipe))

const $inputIngredients = document.getElementById('ingredients')
const $inputAppareils = document.getElementById('appareil')
const $inputUstensiles = document.getElementById('ustensiles')
const $inputRecherche = document.getElementById('recherche')

const $resultIngredients = document.getElementById('resultIngredients')
const $resultAppareils = document.getElementById('resultAppareil')
const $resultUstensiles = document.getElementById('resultUstensiles')

const $tags = document.getElementById('tags')

const $main = document.getElementById('main')

var tags = []

// Récupérer la liste des ingrédients
var ingredientsList = [...new Set(recipes.map((recipe)=> recipe.ingredients.map((ingredientInfo)=> ingredientInfo.ingredient.toUpperCase())).reduce((tabl_1, tabl_2) => tabl_1.concat(tabl_2)))]

// Récupérer la liste des ustensiles
var ustensilesList = [...new Set(recipes.map((recipe)=> recipe.ustensils.map((ustensilsInfo)=> ustensilsInfo.toUpperCase())).reduce((tabl_1, tabl_2) => tabl_1.concat(tabl_2)))]

// Récupérer la liste des appareils
var appareilsList = [...new Set(recipes.map((recipe)=> recipe.appliance.toUpperCase()))]

function displayTags() {
  $tags.innerHTML = ""
  tags.forEach((tag, index)=> {
    $tags.appendChild(tag.HTMLtag())
    $tags.getElementsByTagName('i')[index].addEventListener("click", ()=> {
      tags.splice(index, 1);
      displayTags()
    })
  })
  displayRecipes(sortRecipes())
}

function addTag(name, type) {
  if(!tags.find(element => element.name === name && element.type === type)) {
    tags.push(new Tag(name, type))
    switch (type) {
      case 'ingredient':
        $inputIngredients.value = ""
        $inputIngredients.setAttribute('value', "")
        break;
      case 'appliance':
        $inputAppareils.value = ""
        break;
      case 'ustensil':
        $inputUstensiles.value = ""
        break;
      default:
        break;
    }
  }

  displayTags()
}

function displayRecipes(recipesList) {
  $main.innerHTML = ""
  recipesList.forEach((recipe)=> {
    $main.appendChild(recipe.HTMLrecipe())
  })
}


function sortRecipes() {
  let filteredRecipe = recipesList
  tags.forEach(tag => {
    switch (tag.type) {
      case 'ingredient':
        filteredRecipe = filteredRecipe.filter((rec) => rec.ingredients.filter((ing)=> ing.ingredient.toUpperCase() == tag.name).length > 0)
        break;
      case 'appliance':
        filteredRecipe = filteredRecipe.filter((rec) => rec.appliance.toUpperCase().includes(tag.name))
        break;
      case 'ustensil':
        filteredRecipe = filteredRecipe.filter((rec) => rec.ustensils.filter((ust)=> ust.toUpperCase() == tag.name).length > 0)
        break;
      default:
        break;
    }
  })
  
  if($inputRecherche.value.length >= 3) {
    let inputValue = $inputRecherche.value.toUpperCase()
    filteredRecipe = filteredRecipe.filter((rec)=>
      rec.name.toUpperCase().includes(inputValue) ||
      rec.description.toUpperCase().includes(inputValue) || 
      rec.ingredients.filter((ing) => ing.ingredient.toUpperCase().includes(inputValue)).length > 0
    )
  }
  return filteredRecipe
}

function tagIngredients(e) {
  //récupérer la liste des ingrédients en fonction de la recherche
  var ingredients = ingredientsList.filter((ing)=> ing.includes(e.target.value.toUpperCase()))

  $resultIngredients.innerHTML = ""
  ingredients.forEach((ingredient)=> {
    let li = document.createElement("li")
      li.textContent = ingredient
      li.addEventListener("click", (e)=> {
        addTag(e.target.textContent, 'ingredient')
      })
    $resultIngredients.appendChild(li)
  })
}

function tagAppareil(e) {
  //récupérer la liste de l'appareil en fonction de la recherche
  var appareils = appareilsList.filter((appa)=> appa.includes(e.target.value.toUpperCase()))

  $resultAppareils.innerHTML = ""
  appareils.forEach((appareil)=> {
    let li = document.createElement("li")
      li.textContent = appareil
      li.addEventListener("click", (e)=> {
        addTag(e.target.textContent, 'appliance')
      })
    $resultAppareils.appendChild(li)
  })
}

function tagUstensiles(e) {
  //récupérer la liste des ustensiles en fonction de la recherche
  var ustensiles = ustensilesList.filter((ust) => ust.includes(e.target.value.toUpperCase()))

  $resultUstensiles.innerHTML = ""
  ustensiles.forEach((ustensile)=> {
    let li = document.createElement("li")
      li.textContent = ustensile
      li.addEventListener("click", (e)=> {
        addTag(e.target.textContent, 'ustensil')
      })
    $resultUstensiles.appendChild(li)
  })
}

$inputIngredients.addEventListener('input', tagIngredients)
$inputAppareils.addEventListener('input', tagAppareil)
$inputUstensiles.addEventListener('input', tagUstensiles)

// Barre principale
$inputRecherche.addEventListener('input', (e)=> {
  if(e.target.value.length >= 3) {
    displayRecipes(sortRecipes())
  }
})

displayRecipes(sortRecipes())
displayTags()