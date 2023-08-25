/**
Challenge: 

- Start building out the BoredBot Skeleton however you'd like. 
    That will include:
    - A title for the app ("BoredBot" might be a good start 😉)
    - A placeholder element that will be populated with the random 
      idea we get from the API
    - A button to click for triggering the GET request to the Bored API. 
      (Don't worry about implementing the button quite yet)
*/

// fetch("https://apis.scrimba.com/bored/api/activity")
//     .then(response => response.json())
//     .then(data => {
//         console.log(data)
//         document.getElementById("activity-name").textContent = data.activity
//     })

document.getElementById("get-button").addEventListener('click', function(){
  fetch("https://apis.scrimba.com/bored/api/activity").then(response => response.json()).then(data =>{
    document.getElementById("container").textContent = `${data.activity}`
    let randomColor = pickColor()
    document.body.style.background = `linear-gradient(${randomColor[0]} , ${randomColor[1]})`
})
})

function pickColor() {
  var color = [['#2193b0', '#6dd5ed'], ['#cc2b5e','#753a88'], ['#ee9ca7','#ffdde1'],['#000428','#004e92'],
               ['#42275a','#734b6d'], ['#bdc3c7','#2c3e50'], ['#de6262','#ffb88c'], ['#ddd6f3','#faaca8'],
               ['#06beb6', '#48b1bf'], ['#eb3349','#f45c43'], ['#dd5e89', '#f7bb97'], ['#7b4397','#dc2430'],
               ['#56ab2f', '#a8e063'], ['#614385','#516395'], ['#eecda3','#ef629f'], ['#43cea2','#185a9d'],
               ['#eacda3 ', '#d6ae7b'], ['#02aab0','#00cdac'], ['#d66d75','#e29587'],['#ba5370','#f4e2d8'],
               ['#ff512f ', '#dd2476'], ['#4568dc','#b06ab3'], ['#ec6f66','#f3a183'],['#ffd89b','#19547b'],
               ['#3a1c71 ', '#d76d77'], ['#4ca1af','#c4e0e5'], ['#36d1dc','#5b86e5'],['#ba5370','#f4e2d8'],
              ]
  var randomColor = color[Math.floor(Math.random() * color.length)]
  return randomColor
}