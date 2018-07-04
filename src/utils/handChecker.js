// import { addAces, removeAces } from './aceManipulation.js';
// import { valueSort, suitSort } from './cardSorter.js';
// import * as hands from './mockHands.js';

const addAces = require("./aceManipulation").addAces;
const removeAces = require("./aceManipulation").removeAces;
const valueSort = require('./cardSorter').valueSort;
const suitSort = require('./cardSorter').suitSort;
const hands = require('./mockHands');

// ROYAL FLUSH
// export const checkForRoyalFlush = hand => {
const checkForRoyalFlush = hand => {
    let resultingHand = Object.assign({}, hand);
    const updateRoyalFlush = currentHand => {
        currentHand.handTitle = "Royal Flush";
        currentHand.handRank = 10;
        return currentHand;
    };
    // check for Straight Flush
    if (resultingHand.handRank === 9 && resultingHand.straightCards[0].value === 14) {
        resultingHand = updateRoyalFlush(resultingHand);
    }
    return resultingHand;
};

// STRAIGHT FLUSH
// export const checkForStraightFlush = hand => {
const checkForStraightFlush = hand => {
    let resultingHand = Object.assign({}, hand);
    const updateStraightFlush = currentHand => {
        currentHand.handTitle = "Straight Flush";
        currentHand.handRank = 9;
        currentHand.cardOrder = [
            resultingHand.straightCards[0],
            resultingHand.straightCards[1],
            resultingHand.straightCards[2],
            resultingHand.straightCards[3],
            resultingHand.straightCards[4]
        ];
        return currentHand;
    };
    // check for straight
    if (resultingHand.straight) {
        let update = true;
        for (let i = 0; i < resultingHand.straightCards.length; i++) {
            if (resultingHand.straightCards[i].suit !== resultingHand.suit) {
                for (let j = 0; j < resultingHand.cards.length; j++) {
                    if (
                        resultingHand.straightCards[i].value === resultingHand.cards[j].value &&
                        resultingHand.cards[j].suit === resultingHand.suit
                    ) {
                        resultingHand.straightCards.splice(i, 1, resultingHand.cards[j]);
                    }
                }
            }
        }
        for (let i = 0; i < resultingHand.straightCards.length; i++) {
            if (resultingHand.straightCards[i].suit !== resultingHand.suit) {
                update = false;
            }
        }
        if (update) {
            resultingHand = updateStraightFlush(resultingHand);
        }
    }

    return resultingHand;
};

// 4 OF A KIND
// export const checkForFourKind = hand => {
const checkForFourKind = hand => {
    let resultingHand = Object.assign({}, hand);
    const updateFourKind = currentHand => {
        currentHand.handTitle = "Four of a Kind";
        currentHand.handRank = 8;
        return currentHand;
    };

    // check for PAIR & if card #0 is the same as card #3
    if (
        resultingHand.numPairs > 2 &&
        resultingHand.cardOrder[0].value === resultingHand.cardOrder[3].value
    ) {
        resultingHand = updateFourKind(resultingHand);
    }
    return resultingHand;
};

// FULL HOUSE
// export const checkForFullHouse = hand => {
const checkForFullHouse = hand => {
    let resultingHand = Object.assign({}, hand);
    const updateFullHouse = currentHand => {
        currentHand.handTitle = "Full House";
        currentHand.handRank = 7;
        return currentHand;
    };

    // check for PAIR & if card #0 is the same as card #2
    if (
        resultingHand.numPairs > 1 &&
        ((resultingHand.cardOrder[0].value === resultingHand.cardOrder[2].value &&
            resultingHand.cardOrder[3].value === resultingHand.cardOrder[4].value) ||
            (resultingHand.cardOrder[0].value === resultingHand.cardOrder[1].value &&
                resultingHand.cardOrder[2].value === resultingHand.cardOrder[4].value))
    ) {
        resultingHand = updateFullHouse(resultingHand);
        if (resultingHand.cardOrder[2].value === resultingHand.cardOrder[4].value) {
            [
                resultingHand.cardOrder[0],
                resultingHand.cardOrder[1],
                resultingHand.cardOrder[2],
                resultingHand.cardOrder[3],
                resultingHand.cardOrder[4]
            ] = [
                resultingHand.cardOrder[2],
                resultingHand.cardOrder[3],
                resultingHand.cardOrder[4],
                resultingHand.cardOrder[0],
                resultingHand.cardOrder[1]
            ];
        }
    }
    return resultingHand;
};

// FLUSH
// export const checkForFlush = hand => {
const checkForFlush = hand => {
    let resultingHand = Object.assign({}, hand);

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
// export const checkForStraight = hand => {
const checkForStraight = hand => {
    let resultingHand = Object.assign({}, hand);

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
        currentHand.straightCards = [
            cards[i - 4],
            cards[i - 3],
            cards[i - 2],
            cards[i - 1],
            cards[i]
        ];
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
// export const checkForThreeKind = hand => {
const checkForThreeKind = hand => {
    let resultingHand = Object.assign({}, hand);
    const updateThreeKind = currentHand => {
        currentHand.handTitle = "Three of a Kind";
        currentHand.handRank = 4;
        return currentHand;
    };

    // check for PAIR & if card #0 is the same as card #2
    if (
        resultingHand.numPairs > 1 &&
        resultingHand.cardOrder[0].value === resultingHand.cardOrder[2].value
    ) {
        resultingHand = updateThreeKind(resultingHand);
    }
    return resultingHand;
};

// 2 PAIR
// export const checkForTwoPair = hand => {
const checkForTwoPair = hand => {
    let resultingHand = Object.assign({}, hand);
    const updatePair = currentHand => {
        currentHand.handTitle = "Two Pair";
        currentHand.handRank = 3;
        return currentHand;
    };

    // check for PAIR; disqualify 3 of a kind
    if (
        resultingHand.numPairs === 2 &&
        resultingHand.cardOrder[0].value !== resultingHand.cardOrder[2].value &&
        resultingHand.cardOrder[2].value !== resultingHand.cardOrder[4].value
    ) {
        resultingHand = updatePair(resultingHand);
    }
    return resultingHand;
};

// PAIR
// export const checkForPair = hand => {
const checkForPair = hand => {
    // valueSort
    let resultingHand = Object.assign({}, hand);

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
// export const checkForHighCard = hand => {
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
    // Create a new object to keep this function pure
    let resultingHand = Object.assign({}, hand);

    // Check #1: PAIR
    // This check will setup the Pair keys in the hand object for future reference
    // This check also sets up the initial "cards" key whether a pair was found or not, setting up the High Card check in the process
    resultingHand = checkForPair(resultingHand);

    // Check #2: STRAIGHT
    // This check will setup the Straight keys in the hand object for future reference
    resultingHand = addAces(resultingHand, true);
    resultingHand = checkForStraight(resultingHand);
    resultingHand = removeAces(resultingHand);

    // Check #3: FLUSH
    // This check will determine if at least 5 cards have the same suit & set the appropriate key for future reference
    if (resultingHand.handRank < 6) {
        resultingHand = checkForFlush(resultingHand);
    }

    // Check #4: STRAIGHT FLUSH
    // This is the highest check without any other dependencies other than those above
    if (resultingHand.suit && resultingHand.straight) {
        resultingHand = addAces(resultingHand, true);
        resultingHand = checkForStraightFlush(resultingHand);
        resultingHand = removeAces(resultingHand);
    }

    // Check #5: ROYAL FLUSH
    // This check requires Straight Flush to already be complete
    if (resultingHand.handRank === 9) {
        resultingHand = checkForRoyalFlush(resultingHand);
    }

    // Check #6: 4 OF A KIND
    // This check requires Pairs to be complete & Straight Flush to already be ruled out
    if (resultingHand.numPairs > 0 && resultingHand.handRank < 8) {
        resultingHand = checkForFourKind(resultingHand);
    }
    // Check #7: FULL HOUSE
    // This check requires Pairs to be complete & 4 Kind to be ruled out
    if (resultingHand.numPairs > 1 && resultingHand.handRank < 7) {
        resultingHand = checkForFullHouse(resultingHand);
    }
    // Check #8: 3 OF A KIND
    // This check requires Pairs to be complete & Full House to be ruled out
    if (resultingHand.numPairs > 0 && resultingHand.handRank < 4) {
        resultingHand = checkForThreeKind(resultingHand);
    }
    // Check #9: 2 PAIR
    // This check requires Pairs to be complete & 3 Kind to be ruled out
    if (resultingHand.numPairs > 1 && resultingHand.handRank < 3) {
        resultingHand = checkForTwoPair(resultingHand);
    }

    return resultingHand;
};

// export default determineHand;
module.exports = {
    checkForPair,
    checkForTwoPair,
    checkForThreeKind,
    checkForStraight,
    checkForFlush,
    checkForFullHouse,
    checkForFourKind,
    checkForStraightFlush,
    checkForRoyalFlush,
    determineHand
}

// console.log(determineHand(initialHand));
