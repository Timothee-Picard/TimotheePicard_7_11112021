const Recipe = class {
    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.description = data.description
        this.servings = data.servings
        this.time = data.time
        this.ingredients = data.ingredients
        this.appliance = data.appliance
        this.ustensils = data.ustensils
    }

    HTMLrecipe() {
        let article = document.createElement("article")
        let img = document.createElement("img")
            img.setAttribute("src", "https://via.placeholder.com/372x180")
            img.setAttribute("alt", "")
        let h2 = document.createElement("h2")
            h2.textContent = this.name
        let i = document.createElement("i")
            i.classList.add('far', 'fa-clock')
        let span = document.createElement("span")
            span.textContent = " " + this.time + " min"
            span.insertBefore(i, span.firstChild)
            span.classList.add('time')
        let divingredients = document.createElement("div")
        this.ingredients.forEach(ing => {
            let span = document.createElement("span")
                span.textContent = (ing.quantity)? " " + ing.quantity: ""
                span.textContent += (ing.unit)? " " + ing.unit : ""
            let p = document.createElement("p")
                p.textContent = ing.ingredient
                p.appendChild(span)
            divingredients.appendChild(p)
        })
        let p = document.createElement("p")
            p.textContent = this.description
        let divdescription = document.createElement("div")
            divdescription.appendChild(p)
        let divcontent = document.createElement("div")
            divcontent.classList.add('content')
            divcontent.appendChild(divingredients)
            divcontent.appendChild(divdescription)
        
        article.appendChild(img)
        article.appendChild(h2)
        article.appendChild(span)
        article.appendChild(divcontent)

        return article
    }
}

export default Recipe