// ===================
// VARIABLES
// ===================

let deck = [];
const suits = ["Hearts", "Spades", "Clubs", "Diamonds"];
let playerCards = [];
let dealerCards = [];
let deckAfterHit;
const $hitButton = document.querySelector('.btn__hit-button');
const $standButton = document.querySelector('.btn__stand-button');

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
let firstDeal = deal(deck);

// hit 
$hitButton.addEventListener('click', playerHit);

// stand
$standButton.addEventListener('click', dealerHand);

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
        let faceCardChange = element.value;
        if (element.value > 10 && element.value < 14) {
            faceCardChange = 10;
        }
        if (element.value === 14){
            faceCardChange = 11;
        }
        return faceCardChange;       
    });
    const sumElements = (x, y) => x + y;
    let handSum = deckSum.reduce(sumElements);
    return handSum;
}

function playerHit() {
    let hitCard = firstDeal.remainingDeck.splice(0, 1);
    let remainingDeck = firstDeal.remainingDeck;

    firstDeal.playerCards.push(hitCard[0]);
    let playerDeckAfterHit = firstDeal.playerCards;

    let updatedDeck = {
        playerCards: playerDeckAfterHit,
        dealerCards: dealerCards,
        remainingDeck: remainingDeck
    }
    deckAfterHit = updatedDeck;
}

// returning incorrect hand sum


function dealerHand() {
    let currentDeck = deckAfterHit;
    console.log(currentDeck);
    let hand = sumHand(currentDeck);
    console.log(hand);
}
