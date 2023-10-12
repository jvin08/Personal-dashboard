const BASE_URL = 'https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature'
const DEFAULT_URL = 'https://images.unsplash.com/photo-1495571758719-6ec1e876d6ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTcwMzUzMjV8&ixlib=rb-4.0.3&q=80&w=1080'
const DEFAULT_AUTHOR = 'Johannes Plenio'
const COINS_BASE_URL = 'https://api.coingecko.com/api/v3'
const body = document.querySelector('body')
const coinImgEl = document.getElementById('crypto-img')
const cryptoNameEl = document.getElementById('crypto-name')
const currentPriceEl = document.getElementById('current-price')
const maxPriceEl = document.getElementById('max-price')
const minPriceEl = document.getElementById('min-price')
const time = document.getElementById('time')
const now = new Date()
const timeType = now.getHours() < 12 ? 'AM' : 'PM'

async function getData(url) {
    const response = await fetch(url)
    const data = await response.json()
    return data
}


const authorEl = document.getElementById('author')

async function adjustStyle() {
    await getData(BASE_URL).then(image =>{
        const imageBg = image.urls.regular
        const imageAuthor = image.user.name
        body.style.background = `url(${imageBg})`
        body.style.backgroundSize = 'cover'
        authorEl.innerText = `By: ${imageAuthor}`
    }).catch((err) => {
        console.log(`there is an error: ${err}`)
        body.style.background = `url(${DEFAULT_URL})`
        authorEl.innerText = `By: ${DEFAULT_AUTHOR}`
        body.style.backgroundSize = 'cover'
    })
}


fetch('https://api.coingecko.com/api/v3/coins/dogecoin')
.then(res => {
    if(!res.ok){
        throw Error('there is some issue')
    }
    return res.json()
})
.then(data => {
    console.log(data);
    coinImgEl.src= data.image.small
    cryptoNameEl.innerText = data.name
    currentPriceEl.innerText += data.market_data.current_price.usd
    maxPriceEl.innerText += data.market_data.high_24h.usd
    minPriceEl.innerText += data.market_data.low_24h.usd
})
.catch(err => console.log(err))


time.innerText = now.getHours()%12 + ':' + now.getMinutes() + ':' + now.getSeconds() + ' ' + timeType


adjustStyle()

