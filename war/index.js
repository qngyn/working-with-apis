let deckId
let computerScore = 0
let myScore = 0
const cardsContainer = document.getElementById("cards")
const newDeckBtn = document.getElementById("new-deck")
const drawCardBtn = document.getElementById("draw-cards")
const header = document.getElementById("header")
const remainingText = document.getElementById("remaining")
const computerScoreEl = document.getElementById("computer-score")
const myScoreEl = document.getElementById("my-score")

function newCard() {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
        .then(res => res.json())
        .then(data => {
            deckId = data.deck_id
            remainingText.textContent = `Remaining cards: ${data.remaining}`
        })
}
newDeckBtn.addEventListener("click", newCard)

drawCardBtn.addEventListener("click", () => {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            if (data.remaining >= 0) {
                remainingText.textContent = `Remaining cards: ${data.remaining}`
                const card1 = data.cards[0]
                const card2 = data.cards[1]
                cardsContainer.children[0].innerHTML = `<img src = ${card1.image} class = card />`
                cardsContainer.children[1].innerHTML = `<img src = ${card2.image} class = card />`
                header.textContent = getCardWinner(card1, card2)
            } else {
                drawCardBtn.disabled = true; 
                if (computerScore > myScore) {
                    header.textContent = "Computer wins!"
                } else if (computerScore < myScore) {
                    header.textContent = "You Win!"
                } else {
                    header.textContent = "It's a tie!"
                }
            }
        })
})

function getCardWinner(card1, card2) {
    const cardValue = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1Value = cardValue.indexOf(card1.value)
    const card2Value = cardValue.indexOf(card2.value)
    if (card1Value < card2Value) {
        computerScore++;
        computerScoreEl.textContent = `Computer score: ${computerScore}`
        return "Computer wins!"
    } else if (card1Value > card2Value) {
        myScore++; 
        myScoreEl.textContent = `My score: ${myScore}`
        return "You Win!"
    } else {
        return "War!"
    }

}
