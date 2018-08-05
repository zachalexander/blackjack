// ===================
// VARIABLES
// ===================

let deck = [];
const suits = ["Hearts", "Spades", "Clubs", "Diamonds"];
let playerCards = [];
let dealerCards = [];
const $hitButton = document.querySelector('.btn__hit-button');


// ===================
// GAMEPLAY 
// ===================

// create deck
for (let i = 0; i < 4; i++) {
    for (let j = 2; j < 15; j++) {
        let card = {
            suit: suits[i],
            value: j
        };

        deck.push(card);
    }
}

// shuffle deck
deck = shuffleDeck(deck);

// deal deck
const firstDeal = deal(deck);
console.log(sumHand(firstDeal));
// hit 
$hitButton.addEventListener('click', playerHit);





// ===================
// FUNCTIONS
// ===================

function shuffleDeck(deck) {
    let newDeck = deck.slice();
    for (let i = newDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]]; // eslint-disable-line no-param-reassign
    }
    return newDeck;
}

function deal(deck){
    let topFourCards = deck.slice(0,4);
    let remainingDeck = deck.slice(4,52);

    for (let i = 0; i < topFourCards.length; i++){
        if (i === 0 || i === 2) {
            playerCards.push(topFourCards[i]);
        } else {
            dealerCards.push(topFourCards[i]);
        }
    }
    return {
        playerCards: playerCards,
        dealerCards: dealerCards,
        remainingDeck: remainingDeck
    }
}

function sumHand(deck) {
    let deckSum = deck.playerCards.map(function(element){
        return element.value;       
    });
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    return deckSum.reduce(reducer);
}

function playerHit() {
    let hitCard = firstDeal.remainingDeck.splice(0, 1);
    firstDeal.playerCards.push(hitCard[0]);
    console.log(firstDeal);
    console.log(sumHand(firstDeal));
}

function dealerHit() {

}
