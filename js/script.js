// ===================
// VARIABLES
// ===================

let deck = [];
let playerCards = [];
let dealerCards = [];
const suits = ["Hearts", "Spades", "Clubs", "Diamonds"];
let currentDeck;
const $hit = document.querySelector('.btn__hit-button');
const $stand = document.querySelector('.btn__stand-button');

// ===================
// EVENT LISTENERS
// ===================

$hit.addEventListener('click', function () {
    if (currentDeck === undefined) {
        currentDeck = firstDeal;
    }
    console.log('after hit:', hit(currentDeck, currentDeck.playerCards));
});

// stand
// $stand.addEventListener('click', function(){ 
//     if(currentDeck === undefined){
//         currentDeck = firstDeal;
//     };
//     currentDeck = dealerTurn(currentDeck)
//     console.log('after player stand:', currentDeck); 
// });

// ===================
// GAMEPLAY 
// ===================

// create deck
for (let i = 0; i < suits.length; i++) {
    for (let j = 1; j < 14; j++) {
        let card = {
            suit: suits[i],
            value: j
        };
        deck.push(card);
    }
}

deck = shuffleDeck(deck);

deal(deck);

console.group('player deck:');
console.log(playerCards);
console.log(sumHand(playerCards));
console.groupEnd();

console.group('dealer deck:');
console.log(dealerCards);
console.log(sumHand(dealerCards));
console.groupEnd();

console.group('game deck');
console.log('deck:', deck);
console.groupEnd();


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

function deal(deck) {
    playerCards.push(dealOneCard(deck));
    dealerCards.push(dealOneCard(deck));
    playerCards.push(dealOneCard(deck));
    dealerCards.push(dealOneCard(deck));
}

function dealOneCard(deck) {
    return deck.shift();
}

function sumHand(hand) {
    return hand.reduce(function(accum, current) {
        let pointValue = current.value;
        if (pointValue > 10) {
            pointValue = 10;
        } else if (pointValue === 1) {
            // take the original hand remove Ace from it
            let cardIndex = hand.indexOf(current)
            let handWithoutAce = hand.splice(cardIndex);
            // take the sum of that hand
            let sumWithoutAce = sumHand(handWithoutAce);
            // determine if there is room for an 11-point card
            // if so, then make Ace value 11
            if (sumWithoutAce + 11 < 21) {
                pointValue = 11;
            }
            // if not, leave Ace value as 1
        }
        return accum + pointValue;
    }, 0);
}

// Need to correct sumHand to allow evaluation of hand if Aces are present

function hit(deck, deckToAddCard) {
    let hitCard = deck.remainingDeck.splice(0, 1);
    let remainingDeck = deck.remainingDeck;
    // console.log('remaining deck:', remainingDeck);
    deckToAddCard.push(hitCard[0]);
    deck.remainingDeck = remainingDeck;
    currentDeck = deck;
    return deck;
}

function dealerTurn(deck) {
    let deckToDealer = deck;
    let playerHandSum = sumHand(deckToDealer.playerCards);
    let dealerHandSum = sumHand(deckToDealer.dealerCards);

    if (dealerHandSum <= 17) {
        currentDeck = hit(deckToDealer, dealerCards);
        console.log('deck to dealer after hit:', currentDeck);
    } else {
        console.log('evaluate hands');
    }

}
