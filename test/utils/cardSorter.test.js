const expect = require("chai").expect;
const cardSorter = require("../../src/utils/cardSorter");

describe("****************** FUNCTION cardSorter ******************", () => {
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

    describe("valueSort functionality", () => {
        const randomCards = [
			{ value: 3, suit: "spades" },
			{ value: 8, suit: "clubs" },
			{ value: 14, suit: "diamonds" },
			{ value: 2, suit: "spades" },
			{ value: 5, suit: "spades" },
			{ value: 5, suit: "clubs" },
			{ value: 6, suit: "spades" },
			{ value: 12, suit: "spades" },
			{ value: 2, suit: "diamonds" },
			{ value: 7, suit: "spades" },
			{ value: 14, suit: "hearts" },
			{ value: 13, suit: "clubs" }
		];
        it("should not edit the value of the original hand", () => {
            const startingHand = Object.assign({}, initialHand);
            cardSorter.valueSort(startingHand);
            expect(startingHand).to.deep.equal(initialHand);
        });

        it("should sort all cards by their values from high to low & update the sort", () => {
			let newHand = Object.assign({}, initialHand);
			const expectedCards = [
				{ value: 14, suit: "diamonds" },
				{ value: 14, suit: "hearts" },
				{ value: 13, suit: "clubs" },
				{ value: 12, suit: "spades" },
				{ value: 8, suit: "clubs" },
				{ value: 7, suit: "spades" },
				{ value: 6, suit: "spades" },
				{ value: 5, suit: "spades" },
				{ value: 5, suit: "clubs" },
				{ value: 3, suit: "spades" },
				{ value: 2, suit: "spades" },
				{ value: 2, suit: "diamonds" }
			];
			newHand.cards = randomCards;
			newHand = cardSorter.valueSort(newHand);
            expect(newHand.cards).to.deep.equal(expectedCards);
            expect(newHand.sort).to.equal('valueSort');
		});
    });

    describe("suitSort functionality", () => {
        const randomCards = [
			{ value: 3, suit: "spades" },
			{ value: 8, suit: "clubs" },
			{ value: 14, suit: "diamonds" },
			{ value: 2, suit: "hearts" },
			{ value: 5, suit: "spades" },
			{ value: 5, suit: "clubs" },
			{ value: 6, suit: "hearts" }
		];
        it("should not edit the value of the original hand", () => {
            const startingHand = Object.assign({}, initialHand);
            cardSorter.suitSort(startingHand);
            expect(startingHand).to.deep.equal(initialHand);
        });

        it("should sort the cards by the order of suits: hearts, clubs, diamonds, spades & update the sort value of the returned object", () => {
            let newHand = Object.assign({}, initialHand);
			const expectedCards = [
                { value: 6, suit: "hearts" },
                { value: 2, suit: "hearts" },
                { value: 8, suit: "clubs" },
                { value: 5, suit: "clubs" },
                { value: 14, suit: "diamonds" },
                { value: 5, suit: "spades" },
                { value: 3, suit: "spades" }
			];
			newHand.cards = randomCards;
			newHand = cardSorter.suitSort(newHand);
            expect(newHand.cards).to.deep.equal(expectedCards);
            expect(newHand.sort).to.equal('suitSort');
        });

        it("should update suit=hearts if 5 cards are hearts", () => {
            let newHand = Object.assign({}, initialHand);
			const cardsHearts = [
                { value: 6, suit: "hearts" },
                { value: 2, suit: "hearts" },
                { value: 8, suit: "clubs" },
                { value: 7, suit: "hearts" },
                { value: 14, suit: "diamonds" },
                { value: 5, suit: "hearts" },
                { value: 3, suit: "hearts" }
			];
			newHand.cards = cardsHearts;
			newHand = cardSorter.suitSort(newHand);
            expect(newHand.suit).to.equal('hearts');
        });

        it("should update suit=clubs if 5 cards are clubs", () => {
            let newHand = Object.assign({}, initialHand);
			const cardsHearts = [
                { value: 6, suit: "clubs" },
                { value: 2, suit: "clubs" },
                { value: 8, suit: "clubs" },
                { value: 7, suit: "hearts" },
                { value: 14, suit: "clubs" },
                { value: 5, suit: "clubs" },
                { value: 3, suit: "hearts" }
			];
			newHand.cards = cardsHearts;
			newHand = cardSorter.suitSort(newHand);
            expect(newHand.suit).to.equal('clubs');
        });

        it("should update suit=diamonds if 5 cards are diamonds", () => {
            let newHand = Object.assign({}, initialHand);
			const cardsHearts = [
                { value: 6, suit: "diamonds" },
                { value: 2, suit: "diamonds" },
                { value: 8, suit: "clubs" },
                { value: 7, suit: "diamonds" },
                { value: 14, suit: "diamonds" },
                { value: 5, suit: "hearts" },
                { value: 3, suit: "diamonds" }
			];
			newHand.cards = cardsHearts;
			newHand = cardSorter.suitSort(newHand);
            expect(newHand.suit).to.equal('diamonds');
        });

        it("should update suit=spades if 5 cards are spades", () => {
            let newHand = Object.assign({}, initialHand);
			const cardsHearts = [
                { value: 6, suit: "spades" },
                { value: 2, suit: "hearts" },
                { value: 8, suit: "spades" },
                { value: 7, suit: "hearts" },
                { value: 14, suit: "spades" },
                { value: 5, suit: "spades" },
                { value: 3, suit: "spades" }
			];
			newHand.cards = cardsHearts;
			newHand = cardSorter.suitSort(newHand);
            expect(newHand.suit).to.equal('spades');
        });

        it("should leave the suit value of the returned object null if no suit has 5 cards", () => {
            let newHand = Object.assign({}, initialHand);
			newHand.cards = randomCards;
			newHand = cardSorter.suitSort(newHand);
            expect(newHand.suit).to.equal(null);
        });
    });
});
