const Tag = class {
    constructor(name, type) {
        this.name = name
        this.type = type
    }

    HTMLtag() {
        let li = document.createElement("li")
            li.textContent = this.name
            li.setAttribute("data-type", this.type)
        let i = document.createElement("i")
            i.classList.add('far', 'fa-times-circle')
        li.appendChild(i)

        return li
    }
}

export default Tag