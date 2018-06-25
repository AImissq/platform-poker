const initialHand = {
    cards: [
        { value: 8, suit: 'clubs' },
        { value: 13, suit: 'hearts' },
        { value: 12, suit: 'hearts' },
        { value: 13, suit: 'diamonds' },
        { value: 9, suit: 'hearts' },
        { value: 8, suit: 'hearts' },
        { value: 10, suit: 'hearts' }
    ], // The player's 7 card pool to make a hand from, including 2 hole cards & 5 table cards
	suit: null, // If at least 5 cards share the same suit, that suit will be marked here as a string value
	sort: 'none', // 'none', 'valueSort', or 'suitSort' to reflect what order this.cards are currently in
	handTitle: 'High Card', // String syntax for a hand's title
	handRank: 1, // This is the card rank. 1 is a High Card; 10 is a Royal Flush.
	cardOrder: [], // This is the resulting 5 card hand
		// To check win condition, the player with the highest handRank wins.
		// Tiebreakers are with cardOrder[0].value, then c[1].value, then c[2].value, etc. If no winner after cardOrder.length, it's a tie.
	pairCards: [], // If there is a pair, the system will log a copy of cardOrder so it will not be overwritten by future checks.
	numPairs: 0 // Stores the number of pairs found
}

const valueSort = (hand) => {
	const cards = [ ...hand.cards ];
    for (let i = 0; i < cards.length; i++) {
        let temp = cards[i];
        let j = i - 1;
        // Sort in descending order
        while (j >= 0 && cards[j].value < temp.value) {
            cards[j + 1] = cards[j];
            j--;
        }
        cards[j + 1] = temp;
    }

    const resultingHand = {
		...hand,
		cards,
		suit: null,
		sort: 'valueSort'
	};
    return resultingHand;
};

const suitSort = (hand) => {
	// Since there are no situations where the suited sort doesn't also require a valueSort, this function should accomplish both
	const sortedHand = valueSort(hand);

	const hearts = [];
    const clubs = [];
    const diamonds = [];
    const spades = [];
	let suit = null;
	
    for (let i = 0; i < sortedHand.cards.length; i++) {
        switch (sortedHand.cards[i].suit) {
            case 'hearts':
                hearts.push(sortedHand.cards[i]);
                break;
            case 'clubs':
                clubs.push(sortedHand.cards[i]);
                break;
            case 'diamonds':
                diamonds.push(sortedHand.cards[i]);
                break;
            default:
                spades.push(sortedHand.cards[i]);
		}
	}
	
    if(hearts.length > 4) {
        suit = 'hearts';
    }
    else if(clubs.length > 4) {
        suit = 'clubs';
    }
    else if(diamonds.length > 4) {
        suit = 'clubs';
    }
    else if(spades.length > 4) {
        suit = 'clubs';
	}
	
    const resultingHand = {
		...sortedHand,
        cards: [...hearts, ...clubs, ...diamonds, ...spades],
		suit: suit,
		sort: 'suitSort'
	};
	
    return resultingHand;
};

// ROYAL FLUSH
const checkForRoyalFlush = (hand) => {
	// check for Straight Flush
	// check if [i]0.value === 14
};

// STRAIGHT FLUSH
const checkForStraightFlush = (hand) => {
	// check for straight
	// check if i[0].suit & i[1].suit & i[2].suit & i[3].suit & i[4].suit === hand.suit
};

// 4 OF A KIND
const checkForFourKind = (hand) => {
	// check for 3 KIND
	// check if # of pairs == 4 && i[0].value === i[3].value
};

// FULL HOUSE
const checkForFullHouse = (hand) => {
	// check for 3 KIND
	// check if i[3].value === i[4].value
};

// FLUSH
const checkForFlush = (hand) => {
	let resultingHand = {
		...hand
	};

	const cards = [];

	const updateFlush = (currentHand, i) => {
		currentHand.handTitle = 'Flush';
		currentHand.handRank = 6;
		currentHand.cardOrder = [resultingHand.cards[i], resultingHand.cards[i+1], resultingHand.cards[i+2], resultingHand.cards[i+3], resultingHand.cards[i+4]];
		return currentHand;
	}

	// valueSort then suitSort
	if(resultingHand.sort !== 'suitSort') {
		resultingHand = suitSort(valueSort(resultingHand));
	}

	// After the suitSort, if 5 cards in a row are the same suit, Flush exists
	if(resultingHand.suit === resultingHand.cards[0].suit && resultingHand.suit === resultingHand.cards[4].suit) {
		cards.push(...resultingHand.cards);
		resultingHand = updateFlush(resultingHand, 0);
	}
	else if(resultingHand.suit === resultingHand.cards[1].suit && resultingHand.suit === resultingHand.cards[5].suit) {
		cards.push(resultingHand.cards[1], resultingHand.cards[2], resultingHand.cards[3], resultingHand.cards[4], resultingHand.cards[5], resultingHand.cards[0], resultingHand.cards[6]);
		resultingHand = updateFlush(resultingHand, 1);
	}
	else if(resultingHand.suit === resultingHand.cards[2].suit && resultingHand.suit === resultingHand.cards[6].suit) {
		cards.push(resultingHand.cards[2], resultingHand.cards[3], resultingHand.cards[4], resultingHand.cards[5], resultingHand.cards[6], resultingHand.cards[0], resultingHand.cards[1]);
		resultingHand = updateFlush(resultingHand, 2);
	}
	else {
		cards.push(...resultingHand.cards);
	}

	resultingHand.cards = cards;

	return resultingHand;
};

// STRAIGHT
const checkForStraight = (hand) => {
	let resultingHand = {
		...hand
	};

	let sequential = 0;
	let lastIndex = 0;

	const cards = [];

	const updateStraight = (currentHand, i) => {
		currentHand.handTitle = 'Straight';
		currentHand.handRank = 5;
		currentHand.cardOrder = [cards[i-4], cards[i-3], cards[i-2], cards[i-1], cards[i]];
		return currentHand;
	};

	// Sort by value; suit doesn't matter
	if(resultingHand.sort !== 'valueSort') {
		resultingHand = valueSort(resultingHand);
	}

	// Now that resultingHand is sorted by value, add to the cards array if it's not a duplicate value
	for (let i = 0; i < resultingHand.cards.length; i++) {
		if (cards.length < 5 &&
		(
			i + 1 === resultingHand.cards.length ||
			(i + 1 < resultingHand.cards.length && resultingHand.cards[i].value !== resultingHand.cards[i+1].value)
		)) {
			cards.push(resultingHand.cards[i]);
		}
	}

	// If the current card is sequential with the previous card, and we don't already have 5 cards in order, update sequential and the lastIndex.
	for (let i = 1; i < cards.length; i++) {
		if(sequential < 4 && cards[i].value === cards[i-1].value - 1) {
			sequential++;
			lastIndex = i;
		}
		else if (sequential < 4) {
			sequential = 0;
		}
	}

	if (sequential >= 4) {
		resultingHand = updateStraight(resultingHand, lastIndex);
		resultingHand.cardsOrder = [cards[0], cards[1], cards[2], cards[3], cards[4]];
		resultingHand.straight = true;
	}

	return resultingHand;
};

// 3 OF A KIND
const checkForThreeKind = (hand) => {
	// check for PAIR
	// if # of pairs === 3 & value[0] === value[1], 3 OF A KIND EXISTS
};

// 2 PAIR
const checkForTwoPair = (hand) => {
	// check for PAIR
	// if # of pairs === 2 & value[0] !== value[1], 2 PAIR EXISTS
}

// PAIR
const checkForPair = (hand) => {
	// valueSort
	let resultingHand = {
		...hand
	};

	let numPairs = 0;
	let cards = [];

	const updatePair = (currentHand, i) => {
		currentHand.handTitle = 'Pair';
		currentHand.handRank = 2;
		currentHand.cardOrder = [resultingHand.cards[i], resultingHand.cards[i+1], resultingHand.cards[i+2], resultingHand.cards[i+3], resultingHand.cards[i+4]];
		return currentHand;
	};

	// Sort by value; suit doesn't matter
	if(resultingHand.sort !== 'valueSort') {
		resultingHand = valueSort(resultingHand);
	}

	// Determine what pairs exist, and put the paired cards in the cards array
	for (let i = 1; i < resultingHand.cards.length; i++) {
		if (cards.length < 5 && resultingHand.cards[i].value === resultingHand.cards[i-1].value) {
			numPairs++;
			if (cards.indexOf(resultingHand.cards[i-1]) === -1) {
				cards.push(resultingHand.cards[i-1]);
			}
			cards.push(resultingHand.cards[i]);
		}
	}

	// Complete the cards array with the highest value of leftover cards
	for (let i = 0; i < resultingHand.cards.length; i++) {
		if (cards.length < 5 && cards.indexOf(resultingHand.cards[i]) === -1) {
			cards.push(resultingHand.cards[i]);
		}
	}

	// if # of pairs === 1, PAIR EXISTS
	if (numPairs > 0) {
		resultingHand = updatePair(resultingHand);
		resultingHand.cardOrder = cards;
		resultingHand.pairCards = cards;
		resultingHand.numPairs = numPairs;
	}

	return resultingHand;
}

// HIGH CARD
const checkForHighCard = (hand) => {
	// valueSort
	// update Card Order
};

console.log(checkForPair(initialHand));