const addAces = require('../../src/utils/aceManipulation').addAces;
const removeAces = require('../../src/utils/aceManipulation').removeAces;

const valueSort = require('../../src/utils/cardSorter').valueSort;
const suitSort = require('../../src/utils/cardSorter').suitSort;

const verifyDeckPlayer = require('../../src/utils/dealPlayerCards').verifyDeckPlayer;
const deal = require('../../src/utils/dealPlayerCards').deal;

const verifyDeckTable = require('../../src/utils/dealTableCards').verifyDeckTable;
const flop = require('../../src/utils/dealTableCards').flop;
const turn = require('../../src/utils/dealTableCards').turn;
const river = require('../../src/utils/dealTableCards').river;
const logDeck = require('../../src/utils/dealTableCards').logDeck;

const createDeck = require('../../src/utils/deckBuilder').createDeck;
const shuffle = require('../../src/utils/deckBuilder').shuffle;

const checkForPair = require('../../src/utils/handChecker').checkForPair;
const checkForTwoPair = require('../../src/utils/handChecker').checkForTwoPair;
const checkForThreeKind = require('../../src/utils/handChecker').checkForThreeKind;
const checkForStraight = require('../../src/utils/handChecker').checkForStraight;
const checkForFlush = require('../../src/utils/handChecker').checkForFlush;
const checkForFullHouse = require('../../src/utils/handChecker').checkForFullHouse;
const checkForFourKind = require('../../src/utils/handChecker').checkForFourKind;
const checkForStraightFlush = require('../../src/utils/handChecker').checkForStraightFlush;
const checkForRoyalFlush = require('../../src/utils/handChecker').checkForRoyalFlush;
const determineHand = require('../../src/utils/handChecker').determineHand;

module.exports = {
	addAces,
	removeAces,
	valueSort,
	suitSort,
	verifyDeckPlayer,
	deal,
	verifyDeckTable,
	flop,
	turn,
	river,
	logDeck,
	createDeck,
	shuffle,
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
};
