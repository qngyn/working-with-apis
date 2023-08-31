const authorEl = document.getElementById("author")
const cryptoNameEl = document.getElementById("crypto-top")
const cryptoEl = document.getElementById("crypto")
const timeEl = document.getElementById("time")
fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=flower")
    .then(res => res.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.full})`
        authorEl.textContent = `${data.user.name}`
    })
    .catch( err => {
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1541003571006-029c2613f694?ixlib=rb-4.0.3\u0026q=85\u0026fm=jpg\u0026crop=entropy\u0026cs=srgb)`
        authorEl.textContent = `Amy Humphries`
    })

fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
    .then(res => {
        if (!res.ok) {
            throw Error("Something went wrong")
        } 
        return res.json()
    })
    .then(data => {
        console.log(data)
        cryptoNameEl.innerHTML = `
        <img src="${data.image.small}"
        <span> ${data.name} </span>
        `

        cryptoEl.innerHTML += `
        <p> \uD83C\uDFAF: $${data.market_data.current_price.usd}</p>
        <p>\uD83D\uDC46: $${data.market_data.high_24h.usd} </p>
        <p> \uD83D\uDC47: $${data.market_data.low_24h.usd}</p>
        `
    })
    .catch(err => console.error(err))

function getCurrentTime() {
    const date = new Date()
    const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    const currentDate = date.toJSON().slice(0, 10)
    timeEl.innerHTML =
        `
        <p> ${time} </p>
        <p>${currentDate} </p>
        `
}
setInterval(getCurrentTime, 1000)

navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
    .then(res => {
        if (!res.ok) {
            throw Error("Location is not allowed")
        }
        return res.json()
    })
    .then(data => {
        const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        document.getElementById("weather").innerHTML = `
            <img src=${iconUrl} />
            <p class="weather-temp">${Math.round(data.main.temp)}º</p>
            <p class="weather-city">${data.name}</p>
        `
    })
    .catch(err => console.error(err))
})