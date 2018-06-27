const initialHand = {
    cards: [
        { value: 2, suit: "clubs" },
        { value: 10, suit: "hearts" },
        { value: 12, suit: "hearts" },
        { value: 4, suit: "diamonds" },
        { value: 4, suit: "hearts" },
        { value: 6, suit: "hearts" },
        { value: 8, suit: "spades" }
    ], // The player's 7 card pool to make a hand from, including 2 hole cards & 5 table cards
    suit: "null", // If at least 5 cards share the same suit, that suit will be marked here as a string value
    sort: "none", // 'none', 'valueSort', or 'suitSort' to reflect what order this.cards are currently in
    handTitle: "High Card", // String syntax for a hand's title
    handRank: 1, // This is the card rank. 1 is a High Card; 10 is a Royal Flush.
    cardOrder: [], // This is the resulting 5 card hand
    // To check win condition, the player with the highest handRank wins.
    // Tiebreakers are with cardOrder[0].value, then c[1].value, then c[2].value, etc. If no winner after cardOrder.length, it's a tie.
    pairCards: [], // If there is a pair, the system will log a copy of cardOrder so it will not be overwritten by future checks.
    numPairs: 0, // Stores the number of pairs found
    straight: false,
    straightCards: []
};

/* *****************************************************************************************

**

** BEGIN IMPORTED CODE

**

**************************************************************************************** */

const highCard = [
    { value: 2, suit: "clubs" },
    { value: 10, suit: "hearts" },
    { value: 12, suit: "hearts" },
    { value: 3, suit: "diamonds" },
    { value: 4, suit: "hearts" },
    { value: 6, suit: "hearts" },
    { value: 8, suit: "spades" }
];

const pair = [
    { value: 2, suit: "clubs" },
    { value: 12, suit: "hearts" },
    { value: 13, suit: "hearts" },
    { value: 4, suit: "diamonds" },
    { value: 4, suit: "hearts" },
    { value: 6, suit: "hearts" },
    { value: 8, suit: "spades" }
];

const twoPair = [
    { value: 2, suit: "clubs" },
    { value: 12, suit: "hearts" },
    { value: 12, suit: "hearts" },
    { value: 4, suit: "diamonds" },
    { value: 4, suit: "hearts" },
    { value: 6, suit: "hearts" },
    { value: 8, suit: "spades" }
];

const threeKind = [
    { value: 4, suit: "clubs" },
    { value: 10, suit: "hearts" },
    { value: 12, suit: "hearts" },
    { value: 4, suit: "diamonds" },
    { value: 4, suit: "hearts" },
    { value: 6, suit: "hearts" },
    { value: 8, suit: "spades" }
];

const straight = [
    { value: 2, suit: "hearts" },
    { value: 3, suit: "spades" },
    { value: 4, suit: "hearts" },
    { value: 4, suit: "diamonds" },
    { value: 5, suit: "hearts" },
    { value: 14, suit: "hearts" },
    { value: 8, suit: "spades" }
];

const flush = [
    { value: 2, suit: "clubs" },
    { value: 10, suit: "hearts" },
    { value: 12, suit: "hearts" },
    { value: 4, suit: "diamonds" },
    { value: 4, suit: "hearts" },
    { value: 6, suit: "hearts" },
    { value: 8, suit: "hearts" }
];

const fullHouse = [
    { value: 2, suit: "clubs" },
    { value: 10, suit: "hearts" },
    { value: 2, suit: "hearts" },
    { value: 4, suit: "diamonds" },
    { value: 4, suit: "hearts" },
    { value: 6, suit: "hearts" },
    { value: 2, suit: "spades" }
];

const fourKind = [
    { value: 2, suit: "clubs" },
    { value: 4, suit: "hearts" },
    { value: 12, suit: "hearts" },
    { value: 4, suit: "diamonds" },
    { value: 4, suit: "hearts" },
    { value: 6, suit: "hearts" },
    { value: 4, suit: "spades" }
];

const straightFlush = [
    { value: 2, suit: "hearts" },
    { value: 3, suit: "hearts" },
    { value: 4, suit: "hearts" },
    { value: 4, suit: "diamonds" },
    { value: 5, suit: "hearts" },
    { value: 14, suit: "hearts" },
    { value: 8, suit: "spades" }
];

const royalFlush = [
    { value: 2, suit: "clubs" },
    { value: 10, suit: "hearts" },
    { value: 12, suit: "hearts" },
    { value: 14, suit: "hearts" },
    { value: 4, suit: "hearts" },
    { value: 11, suit: "hearts" },
    { value: 13, suit: "hearts" }
];

initialHand.cards = royalFlush;

/* *****************************************************************************************

**

** END IMPORTED CODE

**

**************************************************************************************** */

const addAces = (hand, addSuit) => {
    const newHand = {
        ...hand
    };
    for (let i = 0; i < newHand.cards.length; i++) {
        if (newHand.cards[i].value === 14) {
            let newCard = { value: 1, suit: "none" };
            if (addSuit) {
                newCard.suit = newHand.cards[i].suit;
            }
            newHand.cards.push(newCard);
        }
    }
    return newHand;
};

const removeAces = hand => {
    const newHand = {
        ...hand
    };
    for (let i = 0; i < newHand.cards.length; i = i) {
        if (newHand.cards[i].value === 1) {
            newHand.cards.splice(i, 1);
        } else {
            i++;
        }
    }
    return newHand;
};

const valueSort = hand => {
    const cards = [...hand.cards];
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
        sort: "valueSort"
    };
    return resultingHand;
};

const suitSort = hand => {
    // Since there are no situations where the suited sort doesn't also require a valueSort, this function should accomplish both
    const sortedHand = valueSort(hand);

    const hearts = [];
    const clubs = [];
    const diamonds = [];
    const spades = [];
    let suit = null;

    for (let i = 0; i < sortedHand.cards.length; i++) {
        switch (sortedHand.cards[i].suit) {
            case "hearts":
                hearts.push(sortedHand.cards[i]);
                break;
            case "clubs":
                clubs.push(sortedHand.cards[i]);
                break;
            case "diamonds":
                diamonds.push(sortedHand.cards[i]);
                break;
            default:
                spades.push(sortedHand.cards[i]);
        }
    }

    if (hearts.length > 4) {
        suit = "hearts";
    } else if (clubs.length > 4) {
        suit = "clubs";
    } else if (diamonds.length > 4) {
        suit = "clubs";
    } else if (spades.length > 4) {
        suit = "clubs";
    }

    const resultingHand = {
        ...sortedHand,
        cards: [...hearts, ...clubs, ...diamonds, ...spades],
        suit: suit,
        sort: "suitSort"
    };

    return resultingHand;
};

// ROYAL FLUSH
const checkForRoyalFlush = hand => {
    const updateRoyalFlush = currentHand => {
        currentHand.handTitle = "Royal Flush";
        currentHand.handRank = 10;
        return currentHand;
    };
    // check for Straight Flush
    if (hand.handRank === 9 && hand.straightCards[0].value === 14) {
        hand = updateRoyalFlush(hand);
    }
    return hand;
};

// STRAIGHT FLUSH
const checkForStraightFlush = hand => {
    const updateStraightFlush = currentHand => {
        currentHand.handTitle = "Straight Flush";
		currentHand.handRank = 9;
		currentHand.cardOrder = [hand.straightCards[0], hand.straightCards[1], hand.straightCards[2], hand.straightCards[3], hand.straightCards[4]];
        return currentHand;
    };
    // check for straight
    if (hand.straight) {
        let update = true;
        for (let i = 0; i < hand.straightCards.length; i++) {
            if (hand.straightCards[i].suit !== hand.suit) {
				for (let j = 0; j < hand.cards.length; j++) {
					if(hand.straightCards[i].value === hand.cards[j].value && hand.cards[j].suit === hand.suit) {
						hand.straightCards.splice(i, 1, hand.cards[j]);
					}				
				}
            }
		}
		for (let i = 0; i < hand.straightCards.length; i++) {
			if (hand.straightCards[i].suit !== hand.suit) {
				update = false;
			}
		}
        if (update) {
            hand = updateStraightFlush(hand);
        }
    }

    return hand;
};

// 4 OF A KIND
const checkForFourKind = hand => {
    const updateFourKind = currentHand => {
        currentHand.handTitle = "Four of a Kind";
        currentHand.handRank = 8;
        return currentHand;
    };

    // check for PAIR & if card #0 is the same as card #3
    if (
        hand.numPairs > 2 &&
        hand.cardOrder[0].value === hand.cardOrder[3].value
    ) {
        hand = updateFourKind(hand);
    }
    return hand;
};

// FULL HOUSE
const checkForFullHouse = hand => {
    const updateFullHouse = currentHand => {
        currentHand.handTitle = "Full House";
        currentHand.handRank = 7;
        return currentHand;
    };

    // check for PAIR & if card #0 is the same as card #2
    if (
        hand.numPairs > 1 &&
        ((hand.cardOrder[0].value === hand.cardOrder[2].value &&
            hand.cardOrder[3].value === hand.cardOrder[4].value) ||
            (hand.cardOrder[0].value === hand.cardOrder[1].value &&
                hand.cardOrder[2].value === hand.cardOrder[4].value))
    ) {
        hand = updateFullHouse(hand);
        if (hand.cardOrder[2].value === hand.cardOrder[4].value) {
            [
                hand.cardOrder[0],
                hand.cardOrder[1],
                hand.cardOrder[2],
                hand.cardOrder[3],
                hand.cardOrder[4]
            ] = [
                hand.cardOrder[2],
                hand.cardOrder[3],
                hand.cardOrder[4],
                hand.cardOrder[0],
                hand.cardOrder[1]
            ];
        }
    }
    return hand;
};

// FLUSH
const checkForFlush = hand => {
    let resultingHand = {
        ...hand
    };

    const cards = [];

    const updateFlush = (currentHand, i) => {
        if (resultingHand.cards[i].suit !== "none") {
            currentHand.handTitle = "Flush";
            currentHand.handRank = 6;
            currentHand.cardOrder = [
                resultingHand.cards[i],
                resultingHand.cards[i + 1],
                resultingHand.cards[i + 2],
                resultingHand.cards[i + 3],
                resultingHand.cards[i + 4]
            ];
        }
        return currentHand;
    };

    // valueSort then suitSort
    if (resultingHand.sort !== "suitSort") {
        resultingHand = suitSort(valueSort(resultingHand));
    }

    // After the suitSort, if 5 cards in a row are the same suit, Flush exists
    if (
        resultingHand.suit === resultingHand.cards[0].suit &&
        resultingHand.suit === resultingHand.cards[4].suit
    ) {
        cards.push(...resultingHand.cards);
        resultingHand = updateFlush(resultingHand, 0);
    } else if (
        resultingHand.suit === resultingHand.cards[1].suit &&
        resultingHand.suit === resultingHand.cards[5].suit
    ) {
        cards.push(
            resultingHand.cards[1],
            resultingHand.cards[2],
            resultingHand.cards[3],
            resultingHand.cards[4],
            resultingHand.cards[5],
            resultingHand.cards[0],
            resultingHand.cards[6]
        );
        resultingHand = updateFlush(resultingHand, 1);
    } else if (
        resultingHand.suit === resultingHand.cards[2].suit &&
        resultingHand.suit === resultingHand.cards[6].suit
    ) {
        cards.push(
            resultingHand.cards[2],
            resultingHand.cards[3],
            resultingHand.cards[4],
            resultingHand.cards[5],
            resultingHand.cards[6],
            resultingHand.cards[0],
            resultingHand.cards[1]
        );
        resultingHand = updateFlush(resultingHand, 2);
    } else {
        cards.push(...resultingHand.cards);
    }

    resultingHand.cards = cards;

    return resultingHand;
};

// STRAIGHT
const checkForStraight = hand => {
    let resultingHand = {
        ...hand
    };

    let sequential = 0;
    let lastIndex = 0;

    const cards = [];

    const updateStraight = (currentHand, i) => {
        currentHand.handTitle = "Straight";
        currentHand.handRank = 5;
        currentHand.cardOrder = [
            cards[i - 4],
            cards[i - 3],
            cards[i - 2],
            cards[i - 1],
            cards[i]
        ];
		currentHand.straight = true;
        currentHand.straightCards = [cards[i-4], cards[i-3], cards[i-2], cards[i-1], cards[i]];
        return currentHand;
    };

    // Sort by value; suit doesn't matter
    if (resultingHand.sort !== "valueSort") {
        resultingHand = valueSort(resultingHand);
    }

    // Now that resultingHand is sorted by value, add to the cards array if it's not a duplicate value
    for (let i = 0; i < resultingHand.cards.length; i++) {
        if (
            i + 1 === resultingHand.cards.length ||
            (i + 1 < resultingHand.cards.length &&
                resultingHand.cards[i].value !==
                    resultingHand.cards[i + 1].value)
        ) {
            cards.push(resultingHand.cards[i]);
        }
    }

    // If the current card is sequential with the previous card, and we don't already have 5 cards in order, update sequential and the lastIndex.
    for (let i = 1; i < cards.length; i++) {
        if (sequential < 4 && cards[i].value === cards[i - 1].value - 1) {
            sequential++;
            lastIndex = i;
        } else if (sequential < 4) {
            sequential = 0;
        }
    }

    if (sequential >= 4) {
        resultingHand = updateStraight(resultingHand, lastIndex);
        // resultingHand.cardsOrder = [
        //     cards[0],
        //     cards[1],
        //     cards[2],
        //     cards[3],
        //     cards[4]
        // ];
        // resultingHand.straight = true;
        // resultingHand.straightCards = [...resultingHand.cardsOrder];
    }

    return resultingHand;
};

// 3 OF A KIND
const checkForThreeKind = hand => {
    const updateThreeKind = currentHand => {
        currentHand.handTitle = "Three of a Kind";
        currentHand.handRank = 4;
        return currentHand;
    };

    // check for PAIR & if card #0 is the same as card #2
    if (
        hand.numPairs > 1 &&
        hand.cardOrder[0].value === hand.cardOrder[2].value
    ) {
        hand = updateThreeKind(hand);
    }
    return hand;
};

// 2 PAIR
const checkForTwoPair = hand => {
    const updatePair = currentHand => {
        currentHand.handTitle = "Two Pair";
        currentHand.handRank = 3;
        return currentHand;
    };

    // check for PAIR; disqualify 3 of a kind
    if (
        hand.numPairs === 2 &&
        hand.cardOrder[0].value !== hand.cardOrder[2].value &&
        hand.cardOrder[2].value !== hand.cardOrder[4].value
    ) {
        hand = updatePair(hand);
    }
    return hand;
};

// PAIR
const checkForPair = hand => {
    // valueSort
    let resultingHand = {
        ...hand
    };

    let numPairs = 0;
    let cards = [];

    const updatePair = (currentHand, i) => {
        currentHand.handTitle = "Pair";
        currentHand.handRank = 2;
        return currentHand;
    };

    // Sort by value; suit doesn't matter
    if (resultingHand.sort !== "valueSort") {
        resultingHand = valueSort(resultingHand);
    }

    // Determine what pairs exist, and put the paired cards in the cards array
    for (let i = 1; i < resultingHand.cards.length; i++) {
        if (
            cards.length < 5 &&
            resultingHand.cards[i].value === resultingHand.cards[i - 1].value
        ) {
            numPairs++;
            if (cards.indexOf(resultingHand.cards[i - 1]) === -1) {
                cards.push(resultingHand.cards[i - 1]);
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

    resultingHand.cardOrder = [...cards];

    // if # of pairs === 1, PAIR EXISTS
    if (numPairs > 0) {
        resultingHand = updatePair(resultingHand);
        resultingHand.pairCards = [...cards];
        resultingHand.numPairs = numPairs;
    }

    return resultingHand;
};

// HIGH CARD
const checkForHighCard = hand => {
    // valueSort
    if (hand.sort !== "valueSort") {
        hand = valueSort(hand);
    }
    // update Card Order
    for (let i = 0; i < 5; i++) {
        hand.cardOrder.push(hand.cards[i]);
    }
    return hand;
};

const determineHand = hand => {
    let resultingHand = {
        ...hand
    };
    // Set the High Card
    //   resultingHand = checkForHighCard(resultingHand);

    // Check #5: PAIR
    resultingHand = checkForPair(resultingHand);

    // Check #1: STRAIGHT
    resultingHand = addAces(resultingHand, true);
    resultingHand = checkForStraight(resultingHand);
    resultingHand = removeAces(resultingHand);

    // Check #4: FLUSH
    if (resultingHand.handRank < 6) {
        resultingHand = checkForFlush(resultingHand);
    }

    // Check #2: STRAIGHT FLUSH
    if (resultingHand.suit && resultingHand.straight) {
        resultingHand = addAces(resultingHand, true);
        resultingHand = checkForStraightFlush(resultingHand);
        resultingHand = removeAces(resultingHand);
    }

    // Check #3: ROYAL FLUSH
    if (resultingHand.handRank === 9) {
        resultingHand = checkForRoyalFlush(resultingHand);
    }

    // Check #6: 4 OF A KIND
    if (resultingHand.numPairs > 0 && resultingHand.handRank < 8) {
        resultingHand = checkForFourKind(resultingHand);
    }
    // Check #7: FULL HOUSE
    if (resultingHand.numPairs > 1 && resultingHand.handRank < 7) {
        resultingHand = checkForFullHouse(resultingHand);
    }
    // Check #8: 3 OF A KIND
    if (resultingHand.numPairs > 0 && resultingHand.handRank < 4) {
        resultingHand = checkForThreeKind(resultingHand);
    }
    // Check #9: 2 PAIR
    if (resultingHand.numPairs > 1 && resultingHand.handRank < 3) {
        resultingHand = checkForTwoPair(resultingHand);
    }

    return resultingHand;
};

console.log(determineHand(initialHand));
