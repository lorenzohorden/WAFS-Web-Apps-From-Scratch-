function addRecordPlayerFunctions () {
    const recordElements = document.querySelectorAll("#bottom input")
    const recordPlayerPlate = document.querySelector("#top > div > div:nth-of-type(1)")
    const playButton = document.querySelector("#top input")
    const audioElement = document.querySelector("audio")

    recordElements.forEach((record) => {
        record.addEventListener("click", () => {
            if(record.checked){
                putRecordOnPlayer(record)
            }
            else{
                record.style.top = 0
                record.style.left = 0
                audioElement.pause()
                audioElement.currentTime = 0
                playButton.checked = false
            }
        })
    })

    function putRecordOnPlayer(recordElement) {
        // https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
        const recordElementLocation = recordElement.getBoundingClientRect()
        const recordPlayerLocation = recordPlayerPlate.getBoundingClientRect()
        const topOffset = recordPlayerLocation.top - recordElementLocation.top
        const leftOffset = recordPlayerLocation.left - recordElementLocation.left
        recordElement.style.top = `${topOffset - 2 * 16}px`
        recordElement.style.left = `${leftOffset + 6 * 16}px`
    }

    playButton.addEventListener("click", () => {
        let audioSrc = ""

        audioSrc = `./audio/${findCurrentRecord().id}.mp3`

        // https://stackoverflow.com/questions/9419263/how-to-play-audio
        if(playButton.checked){
            audioElement.src = audioSrc
            audioElement.play()
        } else {
            audioElement.pause()
            audioElement.currentTime = 0
        }
    })

    function findCurrentRecord(){
        // ik deed dit eerst met een forEach loop, maar chatgpt zei dat dit beter was voor mijn doel.
        for (const record of recordElements) {
            if (record.checked) {
                return record
            }
        }
        return null
    }
}