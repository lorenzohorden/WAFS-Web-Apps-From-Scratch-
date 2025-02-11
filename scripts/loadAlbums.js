const albums = [
    {
        "url": "https://i.scdn.co/image/ab67616d0000b2736c1e31e10c7a5b2ed2258e29",
        "artist": "common"
    },
    {
        "url": "https://upload.wikimedia.org/wikipedia/en/a/a3/Kanyewest_collegedropout.jpg",
        "artist": "kanye_west"
    },
    {
        "url": "https://upload.wikimedia.org/wikipedia/en/5/51/Kendrick_Lamar_-_Damn.png",
        "artist": "kendrick_lamar"
    }
]
const parentElement = document.querySelector("#bottom")

albums.forEach((album) => {
    const checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.id = album.artist
    checkbox.style.setProperty('--background-image', `url(${album.url})`)
    
    parentElement.appendChild(checkbox)
})