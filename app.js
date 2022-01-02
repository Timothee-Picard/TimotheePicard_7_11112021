import recipes from "./recipes.js"

const $inputIngredients = document.getElementById('ingredients')
const $inputAppareils = document.getElementById('appareil')
const $inputUstensiles = document.getElementById('ustensiles')
const $inputRecherche = document.getElementById('recherche')

const $resultIngredients = document.getElementById('resultIngredients')
const $resultAppareils = document.getElementById('resultAppareil')
const $resultUstensiles = document.getElementById('resultUstensiles')

const $tags = document.getElementById('tags')

const $main = document.getElementById('main')

var tags = ['LAIT DE COCO', 'CRÈME DE COCO']

// Récupérer la liste des ingrédients
var ingredientsList = [...new Set(recipes.map((recipe)=> recipe.ingredients.map((ingredientInfo)=> ingredientInfo.ingredient.toUpperCase())).reduce((tabl_1, tabl_2) => tabl_1.concat(tabl_2)))]

// Récupérer la liste des ustensiles
var ustensilesList = [...new Set(recipes.map((recipe)=> recipe.ustensils.map((ustensilsInfo)=> ustensilsInfo.toUpperCase())).reduce((tabl_1, tabl_2) => tabl_1.concat(tabl_2)))]

// Récupérer la liste des appareils
var appareilsList = [...new Set(recipes.map((recipe)=> recipe.appliance.toUpperCase()))]

function displayTags() {
  $tags.innerHTML = ""
  tags.forEach((tag, index)=> {
    let li = document.createElement("li")
      li.textContent = tag
      li.setAttribute("data-tag-index", index)
    let i = document.createElement("i")
      i.classList.add('far', 'fa-times-circle')
      i.addEventListener("click", ()=> {
        tags.splice(index, 1);
        displayTags()
      })
    li.appendChild(i)
    $tags.appendChild(li)
  })
}

function addTag(newtag) {
  tags.includes(newtag)? null : tags.push(newtag)
  displayTags()
}

function displayRecipes(htmlRecipes) {
  $main.innerHTML = ""
  htmlRecipes.forEach(htmlRecipe => {
    $main.innerHTML += `
    <article>
      <img src="" alt="">
      <h2>${htmlRecipe.name}</h2>
      <span><i class="far fa-clock"></i>${htmlRecipe.time} min</span>
      <div>
        ${htmlRecipe.ingredients
          .map((ing)=> `
            <p>${ing.ingredient}
              <span>
                ${(ing.quantity)?': '+ing.quantity:""} ${(ing.unit)?ing.unit:""}
              </span>
            </p>`)
          .join('')}
      </div>
      <div>
        <p>
          ${htmlRecipe.description}
        </p>
      </div>
    </article>`
  });
}

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

function tagIngredients(e) {
  //récupérer la liste des ingrédients en fonction de la recherche
  var ingredients = ingredientsList.filter((ing)=> ing.includes(e.target.value.toUpperCase()))
  console.log(ingredients);
  $resultIngredients.innerHTML = ""
  ingredients.forEach((ingredient)=> {
    let li = document.createElement("li")
      li.textContent = ingredient
      li.addEventListener("click", (e)=> {
        addTag(e.target.textContent)
      })
    $resultIngredients.appendChild(li)
  })

  //récupérer la liste des recettes concernées
  var recette = recipes.filter((rec)=> rec.ingredients.filter((ing)=> ing.ingredient.toUpperCase().includes(e.target.value.toUpperCase())).length > 0)
  console.log(recette)
  displayRecipes(recette)
}

function tagAppareil(e) {
  //récupérer la liste de l'appareil en fonction de la recherche
  var appareils = appareilsList.filter((appa)=> appa.includes(e.target.value.toUpperCase()))
  console.log(appareils)
  $resultAppareils.innerHTML = ""
  appareils.forEach((appareil)=> {
    let li = document.createElement("li")
      li.textContent = appareil
      li.addEventListener("click", (e)=> {
        addTag(e.target.textContent)
      })
    $resultAppareils.appendChild(li)
  })

  //récupérer la liste des recettes concernées
  var recette = recipes.filter((rec)=> rec.appliance.toUpperCase().includes(e.target.value.toUpperCase()))
  console.log(recette)
  displayRecipes(recette)
}

function tagUstensiles(e) {
  //récupérer la liste des ustensiles en fonction de la recherche
  var ustensiles = ustensilesList.filter((ust) => ust.includes(e.target.value.toUpperCase()))
  console.log(ustensiles)
  $resultUstensiles.innerHTML = ""
  ustensiles.forEach((ustensile)=> {
    let li = document.createElement("li")
      li.textContent = ustensile
      li.addEventListener("click", (e)=> {
        addTag(e.target.textContent)
      })
    $resultUstensiles.appendChild(li)
  })

  // récupérer la liste des recettes concernées
  var recette = recipes.filter((rec)=> rec.ustensils.filter((ust)=> ust.toUpperCase().includes(e.target.value.toUpperCase())).length > 0)
  console.log(recette)
  displayRecipes(recette)
}

$inputIngredients.addEventListener('input', tagIngredients)
$inputAppareils.addEventListener('input', tagAppareil)
$inputUstensiles.addEventListener('input', tagUstensiles)

displayRecipes(recipes)
displayTags()