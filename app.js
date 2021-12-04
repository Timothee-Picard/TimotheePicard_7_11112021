import recipes from "./recipes.js"

const $inputIngredients = document.getElementById('ingredients')
const $inputUstensiles = document.getElementById('ustensiles')
const $inputAppareil = document.getElementById('appareil')
const $inputRecherche = document.getElementById('recherche')

// Barre principale
$inputRecherche.addEventListener('input', (e)=> {
  if(e.target.value.length >= 3) {
    var recette = []
    recipes.forEach((rec)=> {
      // on ajoute les recettes contenant le mot recherché dans le nom ou la desc
      if(rec.name.toUpperCase().includes(e.target.value.toUpperCase()) ||
      rec.description.toUpperCase().includes(e.target.value.toUpperCase())) {
        recette.push(rec)
      } 
      else {
        //on cherche dans les ingrédients
        rec.ingredients.forEach((ing)=> {
          (ing.ingredient.toUpperCase().includes(e.target.value.toUpperCase()))? recette.push(rec) : null;
        })
      }
    })
    console.log(recette)
  }
})

// Récupérer la liste des ingrédients
var ingredientsList = []
recipes.forEach((recipe)=> {
    recipe.ingredients.forEach((ingredientInfo)=> {
        ingredientsList.push(ingredientInfo.ingredient.toUpperCase())
    })
})
ingredientsList = [...new Set(ingredientsList)]

// Récupérer la liste des ustensiles
var ustensilesList = []
recipes.forEach((recipe)=> {
    recipe.ustensils.forEach((ustensilsInfo)=> {
      ustensilesList.push(ustensilsInfo.toUpperCase())
    })
})
ustensilesList = [...new Set(ustensilesList)]

// Récupérer la liste des appareils
var appareilsList = []
recipes.forEach((recipe)=> {
    appareilsList.push(recipe.appliance.toUpperCase())
})
appareilsList = [...new Set(appareilsList)]


$inputIngredients.addEventListener('input', (e)=> {
  if(e.target.value.length >= 3) {
      //récupérer la liste des ingrédients en fonction de la recherche
      var ingredients = []
      ingredientsList.forEach((ing)=> {
        (ing.includes(e.target.value.toUpperCase())) ?  ingredients.push(ing) : null;     
      })
      console.log(ingredients)

      //récupérer la liste des recettes concernées
      var recette = []
      recipes.forEach((rec)=> {
        rec.ingredients.forEach((ing)=> {
          ingredients.forEach((e)=> {
            (ing.ingredient.toUpperCase() == e)? recette.push(rec) : null;
          })
        })
      })
      console.log(recette)
  }
})

$inputUstensiles.addEventListener('input', (e)=> {
  if(e.target.value.length >= 3) {
      //récupérer la liste des ustensiles en fonction de la recherche
      var ustensiles = []
      ustensilesList.forEach((ust)=> {
        (ust.includes(e.target.value.toUpperCase())) ?  ustensiles.push(ust) : null;     
      })
      console.log(ustensiles)

      // récupérer la liste des recettes concernées
      var recette = []
      recipes.forEach((rec)=> {
        rec.ustensils.forEach((ust)=> {
          ustensiles.forEach((e)=> {
            (ust.toUpperCase() == e)? recette.push(rec) : null;
          })
        })
      })
      console.log(recette)
  }
})


$inputAppareil.addEventListener('input', (e)=> {
  if(e.target.value.length >= 3) {
      //récupérer la liste de l'appareil en fonction de la recherche
      var appareil = []
      appareilsList.forEach((appa)=> {
        (appa.includes(e.target.value.toUpperCase())) ?  appareil.push(appa) : null;     
      })
      console.log(appareil)

      //récupérer la liste des recettes concernées
      var recette = []
      recipes.forEach((rec)=> {
        appareil.forEach((appa)=> {
          (appa == rec.appliance.toUpperCase())? recette.push(rec) : null;
        })
      })
      console.log(recette)
  }
})