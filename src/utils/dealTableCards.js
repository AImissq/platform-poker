const verifyDeckTable = (deck, numPlayers, event) => {
	if(numPlayers > 5 || numPlayers < 2) {
		return false;
	}
	let missingCards = 2 * numPlayers;
	switch(event) {
		case 'preFlop':
			break;
		case 'postFlop':
		case 'preTurn':
			missingCards = missingCards + 3;
			break;
		case 'postTurn':
		case 'preRiver':
			missingCards = missingCards + 4;
			break;
		case 'postRiver':
			missingCards = missingCards + 5;
			break;
		default:
			return false;
	}
	if(deck.length === 52 - missingCards) {
		return true;
	}
	else { return false; }
};

const flop = deck => {
    const theFlop = [];
    for (let i = 0; i < 3; i++) {
        const random = Math.floor(Math.random() * deck.length);
        theFlop.push(deck[random]);
        deck.splice(random, 1);
    }
    return theFlop;
};

const turn = deck => {
    const theTurn = [];
    for (let i = 0; i < 1; i++) {
        const random = Math.floor(Math.random() * deck.length);
        theTurn.push(deck[random]);
        deck.splice(random, 1);
    }
    return theTurn;
};

const river = deck => {
    const theRiver = [];
    for (let i = 0; i < 1; i++) {
        const random = Math.floor(Math.random() * deck.length);
        theRiver.push(deck[random]);
        deck.splice(random, 1);
    }
    return theRiver;
};

const logDeck = (flop, turn, river, deck) => {
	const log = {
		flop: JSON.parse(JSON.stringify(flop)),
		turn: JSON.parse(JSON.stringify(turn)),
		river: JSON.parse(JSON.stringify(river)),
		deck: JSON.parse(JSON.stringify(deck))
	};
	return log;
};

module.exports = {
	verifyDeckTable,
	flop,
	turn,
	river,
	logDeck
};
