const expect = require("chai").expect;
const handChecker = require("../../src/utils/handChecker");
const hands = require("../../src/utils/mockHands");

describe("****************** FUNCTION handChecker ******************", () => {
    const initialHand = {
        cards: [], // The player's 7 card pool to make a hand from, including 2 hole cards & 5 table cards
        suit: "null", // If at least 5 cards share the same suit, that suit will be marked here as a string value
        sort: "none", // 'none', 'valueSort', or 'suitSort' to reflect what order this.cards are currently in
        handTitle: "High Card", // String syntax for a hand's title
        handRank: 1, // This is the card rank. 1 is a High Card; 10 is a Royal Flush.
        cardOrder: [], // This is the resulting 5 card hand
        pairCards: [], // If there is a pair, the system will log a copy of cardOrder so it will not be overwritten by future checks.
        numPairs: 0, // Stores the number of pairs found
        straight: false, // Toggle if there is a Straight found
        straightCards: [] // If there is a straight, the system will log a copy of the cardOrder so it will not be overwritten by future checks.
    };

    describe("Royal Flush handChecker", () => {
        const testHand = Object.assign({}, initialHand);
        testHand.cards = hands.royalFlush;
        it("should not edit the value of the original hand", () => {
            const originalHand = { ...testHand };
            handChecker.determineHand(testHand);
            expect(originalHand).to.deep.equal(testHand);
        });
        it("should result in a Royal Flush object", () => {
            const expected = {
                cards: [
                    { value: 14, suit: "hearts" },
                    { value: 13, suit: "hearts" },
                    { value: 12, suit: "hearts" },
                    { value: 11, suit: "hearts" },
                    { value: 10, suit: "hearts" },
                    { value: 4, suit: "hearts" },
                    { value: 2, suit: "clubs" }
                ],
                suit: "hearts",
                sort: "suitSort",
                handTitle: "Royal Flush",
                handRank: 10,
                cardOrder: [
                    { value: 14, suit: "hearts" },
                    { value: 13, suit: "hearts" },
                    { value: 12, suit: "hearts" },
                    { value: 11, suit: "hearts" },
                    { value: 10, suit: "hearts" }
                ],
                pairCards: [],
                numPairs: 0,
                straight: true,
                straightCards: [
                    { value: 14, suit: "hearts" },
                    { value: 13, suit: "hearts" },
                    { value: 12, suit: "hearts" },
                    { value: 11, suit: "hearts" },
                    { value: 10, suit: "hearts" }
                ]
            };

            expect(handChecker.determineHand(testHand)).to.deep.equal(expected);
        });
    });

    describe("Straight Flush handChecker", () => {
        const testHand = Object.assign({}, initialHand);
        testHand.cards = hands.straightFlush;
        it("should not edit the value of the original hand", () => {
            const originalHand = { ...testHand };
            handChecker.determineHand(testHand);
            expect(originalHand).to.deep.equal(testHand);
        });
        it("should result in a Straight Flush object with hearts, even when a 4 of diamonds comes before the 4 of hearts", () => {
            const expected = {
                cards: [
                    { value: 14, suit: "hearts" },
                    { value: 5, suit: "hearts" },
                    { value: 4, suit: "hearts" },
                    { value: 3, suit: "hearts" },
                    { value: 2, suit: "hearts" },
                    { value: 4, suit: "diamonds" },
                    { value: 8, suit: "spades" }
                ],
                suit: "hearts",
                sort: "suitSort",
                handTitle: "Straight Flush",
                handRank: 9,
                cardOrder: [
                    { value: 5, suit: "hearts" },
                    { value: 4, suit: "hearts" },
                    { value: 3, suit: "hearts" },
                    { value: 2, suit: "hearts" },
                    { value: 1, suit: "hearts" }
                ],
                pairCards: [
                    { value: 4, suit: "hearts" },
                    { value: 4, suit: "diamonds" },
                    { value: 14, suit: "hearts" },
                    { value: 8, suit: "spades" },
                    { value: 5, suit: "hearts" }
                ],
                numPairs: 1,
                straight: true,
                straightCards: [
                    { value: 5, suit: "hearts" },
                    { value: 4, suit: "hearts" },
                    { value: 3, suit: "hearts" },
                    { value: 2, suit: "hearts" },
                    { value: 1, suit: "hearts" }
                ]
            };

            expect(handChecker.determineHand(testHand)).to.deep.equal(expected);
		});
		it("should result in a Straight Flush object with diamonds, even when a 4 of hearts is included in the hand", () => {
			testHand.cards = hands.straightFlush2;
            const expected = {
                cards: [
					{ value: 14, suit: "diamonds" },
                    { value: 5, suit: "diamonds" },
                    { value: 4, suit: "diamonds" },
                    { value: 3, suit: "diamonds" },
                    { value: 2, suit: "diamonds" },
                    { value: 4, suit: "hearts" },
                    { value: 8, suit: "spades" }
                ],
                suit: "diamonds",
                sort: "suitSort",
                handTitle: "Straight Flush",
                handRank: 9,
                cardOrder: [
                    { value: 5, suit: "diamonds" },
                    { value: 4, suit: "diamonds" },
                    { value: 3, suit: "diamonds" },
                    { value: 2, suit: "diamonds" },
                    { value: 1, suit: "diamonds" }
                ],
                pairCards: [
					{ value: 4, suit: "hearts" },
					{ value: 4, suit: "diamonds" },
                    { value: 14, suit: "diamonds" },
                    { value: 8, suit: "spades" },
                    { value: 5, suit: "diamonds" }
                ],
                numPairs: 1,
                straight: true,
                straightCards: [
                    { value: 5, suit: "diamonds" },
                    { value: 4, suit: "diamonds" },
                    { value: 3, suit: "diamonds" },
                    { value: 2, suit: "diamonds" },
                    { value: 1, suit: "diamonds" }
                ]
            };

            expect(handChecker.determineHand(testHand)).to.deep.equal(expected);
        });
    });

    describe("Four of a Kind handChecker", () => {
        const testHand = Object.assign({}, initialHand);
        testHand.cards = hands.fourKind;
        it("should not edit the value of the original hand", () => {
            const originalHand = { ...testHand };
            handChecker.determineHand(testHand);
            expect(originalHand).to.deep.equal(testHand);
        });
        it("should result in a Four of a Kind object", () => {
            const expected = {
                cards: [
                    { value: 12, suit: "hearts" },
                    { value: 6, suit: "hearts" },
                    { value: 4, suit: "hearts" },
                    { value: 4, suit: "clubs" },
                    { value: 2, suit: "clubs" },
                    { value: 4, suit: "diamonds" },
                    { value: 4, suit: "spades" }
                ],
                suit: null,
                sort: "suitSort",
                handTitle: "Four of a Kind",
                handRank: 8,
                cardOrder: [
                    { value: 4, suit: "hearts" },
                    { value: 4, suit: "diamonds" },
                    { value: 4, suit: "clubs" },
                    { value: 4, suit: "spades" },
                    { value: 12, suit: "hearts" }
                ],
                pairCards: [
                    { value: 4, suit: "hearts" },
                    { value: 4, suit: "diamonds" },
                    { value: 4, suit: "clubs" },
                    { value: 4, suit: "spades" },
                    { value: 12, suit: "hearts" }
                ],
                numPairs: 3,
                straight: false,
                straightCards: []
            };

            expect(handChecker.determineHand(testHand)).to.deep.equal(expected);
        });
    });

    describe("Full House handChecker", () => {
        const testHand = Object.assign({}, initialHand);
        testHand.cards = hands.fullHouse;
        it("should not edit the value of the original hand", () => {
            const originalHand = { ...testHand };
            handChecker.determineHand(testHand);
            expect(originalHand).to.deep.equal(testHand);
        });
        it("should result in a Full House object", () => {
            const expected = {
                cards: [
                    { value: 10, suit: "hearts" },
                    { value: 6, suit: "hearts" },
                    { value: 4, suit: "hearts" },
                    { value: 2, suit: "hearts" },
                    { value: 2, suit: "clubs" },
                    { value: 4, suit: "diamonds" },
                    { value: 2, suit: "spades" }
                ],
                suit: null,
                sort: "suitSort",
                handTitle: "Full House",
                handRank: 7,
                cardOrder: [
                    { value: 2, suit: "clubs" },
                    { value: 2, suit: "hearts" },
                    { value: 2, suit: "spades" },
                    { value: 4, suit: "diamonds" },
                    { value: 4, suit: "hearts" }
                ],
                pairCards: [
                    { value: 4, suit: "diamonds" },
                    { value: 4, suit: "hearts" },
                    { value: 2, suit: "clubs" },
                    { value: 2, suit: "hearts" },
                    { value: 2, suit: "spades" }
                ],
                numPairs: 3,
                straight: false,
                straightCards: []
            };

            expect(handChecker.determineHand(testHand)).to.deep.equal(expected);
        });
    });

    describe("Flush handChecker", () => {
        const testHand = Object.assign({}, initialHand);
        testHand.cards = hands.flush;
        it("should not edit the value of the original hand", () => {
            const originalHand = { ...testHand };
            handChecker.determineHand(testHand);
            expect(originalHand).to.deep.equal(testHand);
        });
        it("should result in a Flush object", () => {
            const expected = {
                cards: [
                    { value: 12, suit: "hearts" },
                    { value: 10, suit: "hearts" },
                    { value: 8, suit: "hearts" },
                    { value: 6, suit: "hearts" },
                    { value: 4, suit: "hearts" },
                    { value: 2, suit: "clubs" },
                    { value: 4, suit: "diamonds" }
                ],
                suit: "hearts",
                sort: "suitSort",
                handTitle: "Flush",
                handRank: 6,
                cardOrder: [
                    { value: 12, suit: "hearts" },
                    { value: 10, suit: "hearts" },
                    { value: 8, suit: "hearts" },
                    { value: 6, suit: "hearts" },
                    { value: 4, suit: "hearts" }
                ],
                pairCards: [
                    { value: 4, suit: "diamonds" },
                    { value: 4, suit: "hearts" },
                    { value: 12, suit: "hearts" },
                    { value: 10, suit: "hearts" },
                    { value: 8, suit: "hearts" }
                ],
                numPairs: 1,
                straight: false,
                straightCards: []
            };

            expect(handChecker.determineHand(testHand)).to.deep.equal(expected);
        });
    });

    describe("Straight handChecker", () => {
        const testHand = Object.assign({}, initialHand);
        testHand.cards = hands.straight;
        it("should not edit the value of the original hand", () => {
            const originalHand = { ...testHand };
            handChecker.determineHand(testHand);
            expect(originalHand).to.deep.equal(testHand);
        });
        it("should result in a Straight object while correctly marking aces high or low", () => {
            const expected = {
                cards: [
                    { value: 14, suit: "hearts" },
                    { value: 5, suit: "hearts" },
                    { value: 4, suit: "hearts" },
                    { value: 2, suit: "hearts" },
                    { value: 4, suit: "diamonds" },
                    { value: 8, suit: "spades" },
                    { value: 3, suit: "spades" }
                ],
                suit: null,
                sort: "suitSort",
                handTitle: "Straight",
                handRank: 5,
                cardOrder: [
                    { value: 5, suit: "hearts" },
                    { value: 4, suit: "diamonds" },
                    { value: 3, suit: "spades" },
                    { value: 2, suit: "hearts" },
                    { value: 1, suit: "hearts" }
                ],
                pairCards: [
					{ value: 4, suit: "hearts" },
                    { value: 4, suit: "diamonds" },
                    { value: 14, suit: "hearts" },
                    { value: 8, suit: "spades" },
                    { value: 5, suit: "hearts" }
                ],
                numPairs: 1,
                straight: true,
                straightCards: [
                    { value: 5, suit: "hearts" },
                    { value: 4, suit: "diamonds" },
                    { value: 3, suit: "spades" },
                    { value: 2, suit: "hearts" },
                    { value: 1, suit: "hearts" }
                ]
            };

            expect(handChecker.determineHand(testHand)).to.deep.equal(expected);
		});
		it("should result in a Straight object with the correct high card when there are more than 5 cards in the straight", () => {
			testHand.cards = hands.straight2;
			const expected = {
                cards: [
					{ value: 14, suit: "hearts" },
					{ value: 5, suit: "hearts" },
					{ value: 4, suit: "hearts" },
					{ value: 2, suit: "hearts" },
					{ value: 6, suit: "diamonds" },
					{ value: 7, suit: "spades" },
					{ value: 3, suit: "spades" }
                ],
                suit: null,
                sort: "suitSort",
                handTitle: "Straight",
                handRank: 5,
                cardOrder: [
                    { value: 7, suit: "spades" },
                    { value: 6, suit: "diamonds" },
                    { value: 5, suit: "hearts" },
                    { value: 4, suit: "hearts" },
                    { value: 3, suit: "spades" }
                ],
                pairCards: [],
                numPairs: 0,
                straight: true,
                straightCards: [
                    { value: 7, suit: "spades" },
                    { value: 6, suit: "diamonds" },
                    { value: 5, suit: "hearts" },
                    { value: 4, suit: "hearts" },
                    { value: 3, suit: "spades" }
                ]
            };

            expect(handChecker.determineHand(testHand)).to.deep.equal(expected);
        });
    });

    describe("Three of a Kind handChecker", () => {
        const testHand = Object.assign({}, initialHand);
        testHand.cards = hands.threeKind;
        it("should not edit the value of the original hand", () => {
            const originalHand = { ...testHand };
            handChecker.determineHand(testHand);
            expect(originalHand).to.deep.equal(testHand);
        });
        it("should result in a Three of a Kind object", () => {
            const expected = {
                cards: [
                    { value: 12, suit: "hearts" },
					{ value: 10, suit: "hearts" },
                    { value: 6, suit: "hearts" },
                    { value: 4, suit: "hearts" },
                    { value: 4, suit: "clubs" },
                    { value: 4, suit: "diamonds" },
                    { value: 8, suit: "spades" }
                ],
                suit: null,
                sort: "suitSort",
                handTitle: "Three of a Kind",
                handRank: 4,
                cardOrder: [
					{ value: 4, suit: "clubs" },
                    { value: 4, suit: "diamonds" },
                    { value: 4, suit: "hearts" },
                    { value: 12, suit: "hearts" },
					{ value: 10, suit: "hearts" }
                ],
                pairCards: [
					{ value: 4, suit: "clubs" },
                    { value: 4, suit: "diamonds" },
                    { value: 4, suit: "hearts" },
                    { value: 12, suit: "hearts" },
					{ value: 10, suit: "hearts" }
                ],
                numPairs: 2,
                straight: false,
                straightCards: []
            };

            expect(handChecker.determineHand(testHand)).to.deep.equal(expected);
        });
    });

    describe("Two Pair handChecker", () => {
        const testHand = Object.assign({}, initialHand);
        testHand.cards = hands.twoPair;
        it("should not edit the value of the original hand", () => {
            const originalHand = { ...testHand };
            handChecker.determineHand(testHand);
            expect(originalHand).to.deep.equal(testHand);
        });
        it("should result in a Two Pair object", () => {
            const expected = {
                cards: [
					{ value: 12, suit: "hearts" },
                    { value: 6, suit: "hearts" },
                    { value: 4, suit: "hearts" },
                    { value: 2, suit: "clubs" },
                    { value: 4, suit: "diamonds" },
                    { value: 12, suit: "spades" },
                    { value: 8, suit: "spades" }
                ],
                suit: null,
                sort: "suitSort",
                handTitle: "Two Pair",
                handRank: 3,
                cardOrder: [
                    { value: 12, suit: "spades" },
                    { value: 12, suit: "hearts" },
                    { value: 4, suit: "diamonds" },
                    { value: 4, suit: "hearts" },
                    { value: 8, suit: "spades" }
                ],
                pairCards: [
                    { value: 12, suit: "spades" },
                    { value: 12, suit: "hearts" },
                    { value: 4, suit: "diamonds" },
                    { value: 4, suit: "hearts" },
                    { value: 8, suit: "spades" }
                ],
                numPairs: 2,
                straight: false,
                straightCards: []
            };

            expect(handChecker.determineHand(testHand)).to.deep.equal(expected);
        });
    });

    describe("Pair handChecker", () => {
        const testHand = Object.assign({}, initialHand);
        testHand.cards = hands.pair;
        it("should not edit the value of the original hand", () => {
            const originalHand = { ...testHand };
            handChecker.determineHand(testHand);
            expect(originalHand).to.deep.equal(testHand);
        });
        it("should result in a Pair object", () => {
            const expected = {
                cards: [
                    { value: 13, suit: "hearts" },
					{ value: 12, suit: "hearts" },
                    { value: 6, suit: "hearts" },
                    { value: 4, suit: "hearts" },
                    { value: 2, suit: "clubs" },
                    { value: 4, suit: "diamonds" },
                    { value: 8, suit: "spades" }
                ],
                suit: null,
                sort: "suitSort",
                handTitle: "Pair",
                handRank: 2,
                cardOrder: [
                    { value: 4, suit: "diamonds" },
                    { value: 4, suit: "hearts" },
                    { value: 13, suit: "hearts" },
                    { value: 12, suit: "hearts" },
                    { value: 8, suit: "spades" }
                ],
                pairCards: [
                    { value: 4, suit: "diamonds" },
                    { value: 4, suit: "hearts" },
                    { value: 13, suit: "hearts" },
                    { value: 12, suit: "hearts" },
                    { value: 8, suit: "spades" }
                ],
                numPairs: 1,
                straight: false,
                straightCards: []
            };

            expect(handChecker.determineHand(testHand)).to.deep.equal(expected);
        });
    });

    describe("High Card handChecker", () => {
        const testHand = Object.assign({}, initialHand);
        testHand.cards = hands.highCard;
        it("should not edit the value of the original hand", () => {
            const originalHand = { ...testHand };
            handChecker.determineHand(testHand);
            expect(originalHand).to.deep.equal(testHand);
        });
        it("should result in a High Card object", () => {
            const expected = {
                cards: [
                    { value: 12, suit: "hearts" },
					{ value: 10, suit: "hearts" },
                    { value: 6, suit: "hearts" },
                    { value: 4, suit: "hearts" },
                    { value: 2, suit: "clubs" },
                    { value: 3, suit: "diamonds" },
                    { value: 8, suit: "spades" }
                ],
                suit: null,
                sort: "suitSort",
                handTitle: "High Card",
                handRank: 1,
                cardOrder: [
                    { value: 12, suit: "hearts" },
					{ value: 10, suit: "hearts" },
                    { value: 8, suit: "spades" },
                    { value: 6, suit: "hearts" },
                    { value: 4, suit: "hearts" }
                ],
                pairCards: [],
                numPairs: 0,
                straight: false,
                straightCards: []
            };

            expect(handChecker.determineHand(testHand)).to.deep.equal(expected);
        });
    });
});
