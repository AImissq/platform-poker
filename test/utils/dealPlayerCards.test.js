const expect = require("chai").expect;
const dealPlayerCards = require("../../src/utils/dealPlayerCards");
const deckBuilder = require("../../src/utils/deckBuilder");

describe("****************** FUNCTION dealPlayerCards ******************", () => {
    describe("verifyDeck functionality", () => {
        it("should provide false if the numPlayers is impossible", () => {
            const deck = deckBuilder.createDeck();

            expect(dealPlayerCards.verifyDeck(deck, 1, false)).to.equal(false);
            expect(dealPlayerCards.verifyDeck(deck, 6, true)).to.equal(false);
        });

        it("should verify the deck has 52 cards before dealing to any number of players", () => {
            for (let i = 2; i < 6; i++) {
                const deck = deckBuilder.createDeck();
                expect(dealPlayerCards.verifyDeck(deck, i, false)).to.equal(
                    true
                );
            }
        });

        it("should verify the deck has dealt the correct number of cards after dealing", () => {
            for (let i = 2; i < 6; i++) {
                const deck = deckBuilder.createDeck();
                deck.splice(0, i * 2);
                expect(dealPlayerCards.verifyDeck(deck, i, true)).to.equal(
                    true
                );
            }
        });
    });

    describe("deal functionality", () => {
        it("should deal 2 cards from the deck to each player", () => {
            for (let i = 2; i < 6; i++) {
                const deck = deckBuilder.createDeck();
                const playerCards = dealPlayerCards.deal(deck, i);
                expect(playerCards.length).to.equal(i);
                expect(deck.length).to.equal(52 - i * 2);
                for (let j = 0; j < playerCards.length; j++) {
                    expect(playerCards[j].length).to.equal(2);
                }
            }
        });

        it("should remove the dealt cards from the deck", () => {
            const deck = deckBuilder.createDeck();
            dealPlayerCards.deal(deck, 5);
            expect(deck.length).to.equal(42);
        });

        it("should move the cards from the deck into the players hands", () => {
            const deck = deckBuilder.createDeck();
            const playerCards = dealPlayerCards.deal(deck, 5);

            for (let i = 0; i < playerCards.length; i++) {
                expect(deck.indexOf(playerCards[i][0])).to.equal(-1);
                expect(deck.indexOf(playerCards[i][1])).to.equal(-1);
            }

            const deck2 = [
                { value: 2, suit: "hearts" },
                { value: 3, suit: "clubs" }
            ];
            const playerCards2 = dealPlayerCards.deal(deck2, 1);
            expect(playerCards2[0]).to.deep.include({
                value: 2,
                suit: "hearts"
            });
            expect(playerCards2[0]).to.deep.include({
                value: 3,
                suit: "clubs"
            });
        });

        it("should no longer have cards from the players hands still in the deck", () => {
            const deck = deckBuilder.createDeck();
            const playerCards = dealPlayerCards.deal(deck, 5);

            for (let i = 0; i < playerCards.length; i++) {
                for (let j = 0; j < deck.length; j++) {
					expect(playerCards[i]).to.not.deep.include(deck[j]);
                }
            }
        });

        it("should deal all the cards and not pass an error", () => {
            const deck = deckBuilder.createDeck();
            const deckCheck = deckBuilder.createDeck();
            const playerCards = dealPlayerCards.deal(deck, 26);

            expect(deck.length).to.equal(0);
            expect(playerCards.length).to.equal(26);

            for (let i = 0; i < playerCards.length; i++) {
                expect(playerCards[i].length).to.equal(2);
                expect(playerCards[i][0]).to.not.equal(undefined);
                expect(playerCards[i][1]).to.not.equal(undefined);

				expect(deckCheck).to.deep.include(playerCards[i][0]);
				expect(deckCheck).to.deep.include(playerCards[i][1]);
            }
        });
    });
});
