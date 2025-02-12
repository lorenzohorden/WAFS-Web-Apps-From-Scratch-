const url = 'https://fdnd.directus.app/items/person/213'
const nameElement = document.querySelector("#name")
getData(url).then(myData => {
    // naam toevoegen aan variabele en dat variabele in element plaatsen
    const name = myData.data.name
    nameElement.textContent = name


    const customData = JSON.parse(myData.data.custom)
    // leerdoelen uit de data halen en die aanmaken
    const leerdoelen = customData[0].data
    addLeerdoelen(leerdoelen)


    // albums uit de data halen en die aanmaken
    const albums = customData[1].data
    addAlbums(albums)
})

let articles = []

function addLeerdoelen(leerdoelen) {
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
    // als ik dit buiten de functie doe worden niet alle articles geselecteerd en werkt de functie moveArticle niet op elk element
    articles = document.querySelectorAll("article")
}


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


async function getData(URL) {
	return (
		fetch(URL)
		.then (
			response => response.json()
		)
		.then (
			jsonData => {return jsonData}
		)
	);
}


// prevent scrolling with mouse keys
// https://stackoverflow.com/questions/8916620/disable-arrow-key-scrolling-in-users-browser
window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false)