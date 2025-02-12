const parentElement = document.querySelector("#bottom")

function addAlbums(albums) {
    albums.forEach((album) => {
        const checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkbox.id = album.artist
        checkbox.style.setProperty('--background-image', `url(${album.url})`)
        
        parentElement.appendChild(checkbox)
    })
}