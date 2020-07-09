const container = document.querySelector('.container')
const quotecontainer = document.querySelector('.quote')
const gradient = document.querySelector('.gradient')
const gradientTwo = document.querySelector('.gradient-two')
const runningBg = document.querySelector('.running-bg')
const refreshIcon = document.querySelector('.icon')
const refreshIconTwo = document.querySelector('.icon-two')
const audio = document.getElementsByTagName('audio')[0]

window.addEventListener('load' , () => {
    container.style.width = '100%'
    quotecontainer.style.width = '100%'
    gradient.style.width = '100%'
    gradientTwo.style.width = '100%'
    runningBg.style.width = '100%'
    fetchQuotes()
})



const fetchQuotes = async () => {
    refreshIcon.style.animation = 'rotate 2s linear forwards infinite'
    refreshIconTwo.style.animation = 'rotate 2s linear forwards infinite'
    gradientTwo.style.animation = 'none'    

    try {
        const res = await(fetch('https://breakingbadapi.com/api/quotes'))

        const quote = await res.json()
    
        const quoteList = quote.slice(0,52)
    
        let randomQuote = quoteList[Math.floor(Math.random() * quoteList.length)]
        
        let authorFirstName = randomQuote.author.split(' ')[0]
    
        if(authorFirstName === 'Gus'){
            authorFirstName = authorFirstName + 'tavo'
        } else if (authorFirstName === 'Hank') {
            authorFirstName = "Henry"
        }
        
        fetchImage(authorFirstName)
    
        const quoteContainer = document.querySelector('.quote')
        quoteContainer.innerHTML = `<p class="quote-text">${randomQuote["quote"]}</p>`
    
    } catch (err) {
        console.error(err)
    }


    
}

const fetchImage = async author => {
    try {

        const res = await(fetch(`https://breakingbadapi.com/api/characters?name=${author}`))
        const data = await res.json()
        const imageLink =  data[0].img
        
        let imagePosition
        switch (author) {
            case "Jesse":
            case "Saul":
            case "Hector":
            case "Mike":
                imagePosition= 'center'
                break;
            case "Walter":
            case "Skyler":
            case "Gustavo":
                imagePosition = 'top'
                break;
            
            default:
                imagePosition = 'center'
                break;
        } 

        container.style.background = `url(${imageLink}) no-repeat center ${imagePosition}/cover`
        gradientTwo.style.animation = 'bgopacity 3s ease-out forwards'
        
        refreshIcon.style.animation = 'none'
        refreshIconTwo.style.animation = 'none'
    } catch (err) {
        console.error(err)
    }
}

refreshIcon.addEventListener('click', () => {
    fetchQuotes()
    audio.play()
})

