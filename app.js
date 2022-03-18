import recipes from "./recipes.js"

import Tag from "./model/Tag.js"
import Recipe from "./model/Recipe.js"

var recipesList = []
for (let index = 0; index < recipes.length; index++) {
  recipesList.push(new Recipe(recipes[index]))
  
}

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
  for (let index = 0; index < tags.length; index++) {
    $tags.appendChild(tags[index].HTMLtag())
    $tags.getElementsByTagName('i')[index].addEventListener("click", ()=> {
      tags.splice(index, 1);
      displayTags()
    })
  }
  displayRecipes(sortRecipes())
}

function addTag(name, type) {
  if(!tags.find(element => element.name === name && element.type === type)) {
    tags.push(new Tag(name, type))
    switch (type) {
      case 'ingredient':
        $inputIngredients.value = ""
        $inputIngredients.setAttribute('value', "")
        tagIngredients()
        break;
      case 'appliance':
        $inputAppareils.value = ""
        $inputAppareils.setAttribute('value', "")
        tagAppareil()
        break;
      case 'ustensil':
        $inputUstensiles.value = ""
        $inputUstensiles.setAttribute('value', "")
        tagUstensiles()
        break;
      default:
        break;
    }
  }

  displayTags()
}

function displayRecipes(recipesList) {
  $main.innerHTML = ""
  for (let index = 0; index < recipesList.length; index++) {
    $main.appendChild(recipesList[index].HTMLrecipe())
    
  }
}


function sortRecipes() {
  let filteredRecipe = recipesList
  for (let index = 0; index < tags.length; index++) {
    switch (tags[index].type) {
      case 'ingredient':
        filteredRecipe = []
        for (let i = 0; i < recipesList.length; i++) {
          let savefilteredRecipe = []
          for (let ind = 0; ind < recipesList[i].ingredients.length; ind++) {
            if(recipesList[i].ingredients[ind].ingredient.toUpperCase() == tags[index].name) {
              savefilteredRecipe.push(recipesList[i].ingredients[ind])
            }
          }
          if(savefilteredRecipe.length > 0){
            filteredRecipe.push(recipesList[i])
          }
        }
        break;
      case 'appliance':
        filteredRecipe = []
        for (let i = 0; i < recipesList.length; i++) {
          if(recipesList[i].appliance.toUpperCase().includes(tags[index].name)) {
            filteredRecipe.push(recipesList[i])
          }
        }
        break;
      case 'ustensil':
        filteredRecipe = []
        for (let i = 0; i < recipesList.length; i++) {
          let savefilteredRecipe = []
          for (let ind = 0; ind < recipesList[i].ustensils.length; ind++) {
            if(recipesList[i].ustensils[ind].toUpperCase() == tags[index].name) {
              savefilteredRecipe.push(recipesList[i].ustensils[ind])
            }
          }
          if(savefilteredRecipe.length > 0){
            filteredRecipe.push(recipesList[i])
          }
        }
        break;
      default:
        break;
    }
    
  }
  
  if($inputRecherche.value.length >= 3) {
    let inputValue = $inputRecherche.value.toUpperCase()
    let saveFilteredRecipe = filteredRecipe
    filteredRecipe =[]
    for (let i = 0; i < saveFilteredRecipe.length; i++) {
      var ingre = []
      for (let ind = 0; ind < saveFilteredRecipe[i].ingredients.length; ind++) {
        if(saveFilteredRecipe[i].ingredients[ind].ingredient.toUpperCase().includes(inputValue)) {
          ingre.push(saveFilteredRecipe[i].ingredients)
        }
      }
      if(
        saveFilteredRecipe[i].name.toUpperCase().includes(inputValue) ||
        saveFilteredRecipe[i].description.toUpperCase().includes(inputValue) || 
        ingre.length > 0) {
          filteredRecipe.push(saveFilteredRecipe[i])
        }
    }
  }
  return filteredRecipe
}

function tagIngredients(e) {
  //récupérer la liste des ingrédients en fonction de la recherche
  if(e) {
    var ingredients = []

    for (let index = 0; index < ingredientsList.length; index++) {
      if(ingredientsList[index].includes(e.target.value.toUpperCase()))[
        ingredients.push(ingredientsList[index])
      ]
    }
  } else {
    var ingredients = ingredientsList
  }

  $resultIngredients.innerHTML = ""
  for (let index = 0; index < ingredients.length; index++) {
    let li = document.createElement("li")
      li.textContent = ingredients[index]
      li.addEventListener("click", (e)=> {
        addTag(e.target.textContent, 'ingredient')
      })
    $resultIngredients.appendChild(li)
  }
}

function tagAppareil(e) {
  //récupérer la liste de l'appareil en fonction de la recherche
  if(e) {
    var appareils = []
    for (let index = 0; index < appareilsList.length; index++) {
      if(appareilsList[index].includes(e.target.value.toUpperCase())) {
        appareils.push(appareilsList[index])
      }
    } 
  } else {
    var appareils = appareilsList
  }

  $resultAppareils.innerHTML = ""
  for (let index = 0; index < appareils.length; index++) {
    let li = document.createElement("li")
      li.textContent = appareils[index]
      li.addEventListener("click", (e)=> {
        addTag(e.target.textContent, 'appliance')
      })
    $resultAppareils.appendChild(li)
  }
}

function tagUstensiles(e) {
  //récupérer la liste des ustensiles en fonction de la recherche
  if(e) {
    var ustensiles = []
    for (let index = 0; index < ustensilesList.length; index++) {
      if(ustensilesList[index].includes(e.target.value.toUpperCase())) {
        ustensiles.push(ustensilesList[index])
      }
    }
  } else {
    var ustensiles = ustensilesList
  }
  $resultUstensiles.innerHTML = ""
  for (let index = 0; index < ustensiles.length; index++) {
    let li = document.createElement("li")
      li.textContent = ustensiles[index]
      li.addEventListener("click", (e)=> {
        addTag(e.target.textContent, 'ustensil')
      })
    $resultUstensiles.appendChild(li)
  }
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

tagIngredients()
tagAppareil()
tagUstensiles()
displayTags()