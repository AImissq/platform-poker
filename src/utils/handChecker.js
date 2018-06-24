initialHand = {
    cards: [
        { value: 8, suit: 'clubs' },
        { value: 13, suit: 'hearts' },
        { value: 12, suit: 'hearts' },
        { value: 11, suit: 'diamonds' },
        { value: 6, suit: 'hearts' },
        { value: 8, suit: 'hearts' },
        { value: 10, suit: 'hearts' }
    ],
	suit: null,
	sort: 'none',
	handTitle: 'High Card',
	handRank: 1,
	cardOrder: []
	// To check win condition, the player with the highest handRank wins.
	// Tiebreakers are with cardOrder[0].value, then c[1].value, then c[2].value, etc. If no winner after cardOrder.length, it's a tie.
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
	
    if(hearts.length > clubs.length && hearts.length > diamonds.length && hearts.length > spades.length) {
        suit = 'hearts';
    }
    else if(clubs.length > hearts.length && clubs.length > diamonds.length && clubs.length > spades.length) {
        suit = 'clubs';
    }
    else if(diamonds.length > hearts.length && diamonds.length > clubs.length && diamonds.length > spades.length) {
        suit = 'clubs';
    }
    else if(spades.length > hearts.length && spades.length > clubs.length && spades.length > diamonds.length) {
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

// valueSort
// suitSort
// if i[0].suit === i[4].suit || i[1] === i[5] || i[2] === i[6]
// FLUSH EXISTS

// STRAIGHT
// valueSort
// count suitSort
// case hearts === 5, suit = "hearts"
// case diamonds === 5, suit = "diamonds"
// case spades === 5, suit = "spades"
// case clubs === 5, suit = "clubs"
// default: suit = null
// if i[0] === i[1]
// 	if suit === i[0].suit
// 		push i[0] to new array
// 	else
// 		push i[1] to new array
// else
// 	i++
// if i[0].value - 4 === i[4].value, STRAIGHT EXISTS
// else if i[1].value - 4 === i[5].value, STRAIGHT EXISTS
// else if i[2].value - 4 === i[6].value, STRAIGHT EXISTS

// 3 OF A KIND
// check for PAIR
// if # of pairs === 3 & value[0] === value[1], 3 OF A KIND EXISTS

// 2 PAIR
// check for PAIR
// if # of pairs === 2 & value[0] !== value[1], 2 PAIR EXISTS

// PAIR
// valueSort
// valueCheck
// if # of pairs === 1, PAIR EXISTS

// HIGH CARD
