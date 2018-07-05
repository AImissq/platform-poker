const createDeck = () => {
	const deck = [];
	for (let i = 0; i < 4; i++) {
		let suit;
		switch(i) {
			case 0:
				suit = 'hearts';
				break;
			case 1:
				suit = 'clubs';
				break;
			case 2:
				suit = 'diamonds';
				break;
			case 3:
				suit = 'spades';
				break;
			default:
				return [];
		}
		for (let j = 2; j < 15; j++) {
			deck.push({ value: j, suit });
		}
	}
	return deck;
};

// Fisher-Yates shuffle (https://github.com/coolaj86/knuth-shuffle)
const shuffle = (oldDeck) => {
	const deck = oldDeck.slice(0);
	let currentIndex = deck.length, temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = deck[currentIndex];
		deck[currentIndex] = deck[randomIndex];
		deck[randomIndex] = temporaryValue;
	}

	return deck;
}

module.exports = {
	createDeck,
	shuffle
};
