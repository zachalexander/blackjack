// ===================
// VARIABLES
// ===================

let deck = [];
const suits = ["Hearts", "Spades", "Clubs", "Diamonds"];


// ===================
// GAMEPLAY
// ===================

for (let i = 0; i < 4; i++) {
    for (let j = 2; j < 15; j++) {
        let card = {
            suit: suits[i],
            value: j
        };

        deck.push(card);
    }
}

deck = shuffleDeck(deck);
deal(deck);


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
    console.log(deck.shift());
}




// put functions towards bottom