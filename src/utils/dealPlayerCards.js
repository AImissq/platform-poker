const verifyDeck = (deck, numPlayers, dealt) => {
    if (numPlayers > 5 || numPlayers < 2) {
        return false;
    }
    let missingCards = 0;
    if (dealt) {
        missingCards = 2 * numPlayers;
    }
    if (deck.length === 52 - missingCards) {
        return true;
    } else {
        return false;
    }
};

const deal = (deck, numPlayers) => {
    const playerCards = [];
    for (let i = 0; i < numPlayers; i++) {
        const tempArray = [];

        const randomCard1 = Math.floor(Math.random() * deck.length);
        tempArray.push(deck[randomCard1]);
        deck.splice(randomCard1, 1);

        const randomCard2 = Math.floor(Math.random() * deck.length);
        tempArray.push(deck[randomCard2]);
        deck.splice(randomCard2, 1);

		playerCards.push(tempArray);
	}
    return playerCards;
};

module.exports = {
    verifyDeck,
    deal
};
