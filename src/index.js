console.log('%c HI', 'color: firebrick')

document.addEventListener("DOMContentLoaded", () => {
    
    //render cute dogs fetched from an url
    fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(resp => resp.json())
    .then(imgObject => {
        imgObject.message.forEach(imgURL => {
            newImg = document.createElement("img")
            newImg.src = imgURL
            document.getElementById("dog-image-container").append(newImg)

        })
    })

    //removes all childNodes from a node
    const clearList = (list) => {
        while (list.firstChild) {
            list.removeChild(list.firstChild)
        }
    }

    //get dogbreeds and adds them to the ul element in the HTML based on the the letter entered or the the value of the dropdown
    const getDogBreeds = letter => {
        if (typeof letter !== "string") letter = letter.target.value 
        const ulList = document.getElementById("dog-breeds")
        clearList(ulList)
        fetch("https://dog.ceo/api/breeds/list/all")
        .then(resp => resp.json())
        .then(breedObject => {
            Object.keys(breedObject.message).forEach(breed => {
                if (breed[0] === letter){
                    breedItem = document.createElement("li")
                    breedItem.textContent = breed
                    ulList.append(breedItem)
                    breedItem.addEventListener("click", (e) =>{
                        e.target.style.color = "red"
                    })
                }
            })
        })
    }

    //dropdown filter defaults to "a"
    getDogBreeds("a")

    const selectDropdown = document.getElementById("breed-dropdown")
    selectDropdown.addEventListener("change", getDogBreeds)

    //adding all letters to the dropdown filter
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("")
    alphabet.forEach(letter => {
        const filter = document.createElement("option")
        filter.value = letter
        filter.textContent = letter
        selectDropdown.append(filter)
    })
    
})
