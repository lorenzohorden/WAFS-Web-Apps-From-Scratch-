const leerdoelen = [
    {
        "titel": "CSS animaties",
        "beschrijving": "Ik heb een paar keer animaties gebruikt in CSS, maar dat is eigenlijk altijd gekopieerde code. Eigenlijk snap ik niet hoe het werkt en als ik zelf een animatie wil maken doe ik het vaak met JavaScript."
    },
    {
        "titel": "Responsive coderen",
        "beschrijving": "We hebben eerder in de opleiding bij FeD een beetje besproken hoe je met beperkingen rekening kunt houden in een website. Soms als ik een tutorial of voorbeeldcode bekijk zie ik mediaquery's die ik nog nooit eerder gezien heb, het lijkt me leuk om alle mogelijke situaties te leren. Als ik een website responsive maak voor mobile en desktop gebruik ik vaak heel veel mediaquery's en ik weet dat als ik meer met min-width enzo ga werken dat ik mijn code zo een stuk mooier kan maken."
    },
    {
        "titel": "Verslaglegging",
        "beschrijving": "Tijdens tech vakken vind ik coderen vaak belangrijker dan het projectverslag, waardoor ik altijd in de laatste week bezig ben met het maken van een verslag. Het lijkt me een goed idee om me tijdens deze minor wat meer te focussen op verslaglegging, commentaar bij coderen en bronvermelding, omdat dat mij beter maakt om mee samen te werken."
    },
    {
        "titel": "",
        "beschrijving": ""
    },
]

function addLeerdoelen() {
    const section = document.querySelector("section")
    leerdoelen.forEach((doel) => {
        const article = document.createElement("article")
        article.classList.add("row-2")
        const h2 = document.createElement("h2")
        h2.textContent = doel.titel
        const p = document.createElement("p")
        p.textContent = doel.beschrijving

        article.appendChild(h2)
        article.appendChild(p)

        section.appendChild(article)
    })
}
addLeerdoelen()

const articles = document.querySelectorAll("article")
const amountOfRows = 2
let translateLeft = 0
let translateTop = 0
document.addEventListener("keydown", (event) => {
    const section = document.querySelector("section")
    if(event.key === "ArrowUp"){
        translateTop += 100
        translateLeft = 0
    }
    if(event.key === "ArrowDown"){
        translateTop -= 100
        translateLeft = 0
    }
    if(event.key === "ArrowRight"){
        translateLeft -= 100
    }
    if(event.key === "ArrowLeft"){
        translateLeft += 100
    }

    if(translateLeft > 0){translateLeft = 0}
    if(translateTop > 0){translateTop = 0}

    const amountOfCards = document.querySelectorAll(`.row-${(-translateTop + 100) / 100}`).length
    if(((- translateLeft + 100) / 100) > amountOfCards) {
        translateLeft = amountOfCards * - 100 + 100
        section.style.animation = ".2s endOfWidthCards"
    }

    if(translateTop < -amountOfRows * 100 + 100){
        translateTop = -amountOfRows * 100 + 100
        translateLeft -= 100
        section.style.animation = ".2s endOfHeightCards"
    }

    section.addEventListener("animationend", () => {
        section.style.animation = "none"
    }, { once: true })

    articles.forEach((article) => {moveArticle(article)})
})

function moveArticle(article) {
    article.style.transform = `translate(${translateLeft}%, ${translateTop}%)`
}

// prevent scrolling with mouse keys
// https://stackoverflow.com/questions/8916620/disable-arrow-key-scrolling-in-users-browser
window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false)