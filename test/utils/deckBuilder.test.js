const expect = require('chai').expect;
const deckBuilder = require('../../src/utils/deckBuilder');

describe('****************** FUNCTION deckBuilder ******************', () => {
    describe('deckBuilder functionality', () => {
        const sortedCards = [
            { value: 2, suit: 'hearts' },
            { value: 3, suit: 'hearts' },
            { value: 4, suit: 'hearts' },
            { value: 5, suit: 'hearts' },
            { value: 6, suit: 'hearts' },
            { value: 7, suit: 'hearts' },
            { value: 8, suit: 'hearts' },
            { value: 9, suit: 'hearts' },
            { value: 10, suit: 'hearts' },
            { value: 11, suit: 'hearts' },
            { value: 12, suit: 'hearts' },
            { value: 13, suit: 'hearts' },
            { value: 14, suit: 'hearts' },
            { value: 2, suit: 'clubs' },
            { value: 3, suit: 'clubs' },
            { value: 4, suit: 'clubs' },
            { value: 5, suit: 'clubs' },
            { value: 6, suit: 'clubs' },
            { value: 7, suit: 'clubs' },
            { value: 8, suit: 'clubs' },
            { value: 9, suit: 'clubs' },
            { value: 10, suit: 'clubs' },
            { value: 11, suit: 'clubs' },
            { value: 12, suit: 'clubs' },
            { value: 13, suit: 'clubs' },
            { value: 14, suit: 'clubs' },
            { value: 2, suit: 'diamonds' },
            { value: 3, suit: 'diamonds' },
            { value: 4, suit: 'diamonds' },
            { value: 5, suit: 'diamonds' },
            { value: 6, suit: 'diamonds' },
            { value: 7, suit: 'diamonds' },
            { value: 8, suit: 'diamonds' },
            { value: 9, suit: 'diamonds' },
            { value: 10, suit: 'diamonds' },
            { value: 11, suit: 'diamonds' },
            { value: 12, suit: 'diamonds' },
            { value: 13, suit: 'diamonds' },
            { value: 14, suit: 'diamonds' },
            { value: 2, suit: 'spades' },
            { value: 3, suit: 'spades' },
            { value: 4, suit: 'spades' },
            { value: 5, suit: 'spades' },
            { value: 6, suit: 'spades' },
            { value: 7, suit: 'spades' },
            { value: 8, suit: 'spades' },
            { value: 9, suit: 'spades' },
            { value: 10, suit: 'spades' },
            { value: 11, suit: 'spades' },
            { value: 12, suit: 'spades' },
            { value: 13, suit: 'spades' },
            { value: 14, suit: 'spades' }
        ]
        it('should deal all 52 cards with no duplicates in order', () => {
            const deck = deckBuilder.createDeck();
            expect(deck).to.deep.equal(sortedCards);
        });
    });
    
    describe('shuffle function', () => {
        it('should shuffle the deck array, but still include all cards', () => {
            let deck = deckBuilder.createDeck();
            deck = deckBuilder.shuffle(deck);
            let hearts = 0, clubs = 0, diamonds = 0, spades = 0;
            let two = 0, three = 0, four = 0, five = 0;
            let six = 0, seven = 0, eight = 0, nine = 0;
            let ten = 0, jack = 0, queen = 0, king = 0, ace = 0;
            let error = 0;

            for (let i = 0; i < deck.length; i++) {
                if(deck[i].suit === 'hearts') { hearts++; }
                else if(deck[i].suit === 'clubs') { clubs++; }
                else if(deck[i].suit === 'diamonds') { diamonds++; }
                else if(deck[i].suit === 'spades') { spades++; }
                else { error++; }

                if(deck[i].value === 2) { two++; }
                else if(deck[i].value === 3) { three++; }
                else if(deck[i].value === 4) { four++; }
                else if(deck[i].value === 5) { five++; }
                else if(deck[i].value === 6) { six++; }
                else if(deck[i].value === 7) { seven++; }
                else if(deck[i].value === 8) { eight++; }
                else if(deck[i].value === 9) { nine++; }
                else if(deck[i].value === 10) { ten++; }
                else if(deck[i].value === 11) { jack++; }
                else if(deck[i].value === 12) { queen++; }
                else if(deck[i].value === 13) { king++; }
                else if(deck[i].value === 14) { ace++; }
                else { error++; }
            }

            expect(error).to.equal(0);

            expect(hearts).to.equal(13);
            expect(clubs).to.equal(13);
            expect(diamonds).to.equal(13);
            expect(spades).to.equal(13);

            expect(two).to.equal(4);
            expect(three).to.equal(4);
            expect(four).to.equal(4);
            expect(five).to.equal(4);
            expect(six).to.equal(4);
            expect(seven).to.equal(4);
            expect(eight).to.equal(4);
            expect(nine).to.equal(4);
            expect(ten).to.equal(4);
            expect(jack).to.equal(4);
            expect(queen).to.equal(4);
            expect(king).to.equal(4);
            expect(ace).to.equal(4);
            
            expect(deck.length).to.equal(52);
        });

        it('should not change the original array', () => {
            const deckOne = deckBuilder.createDeck();
            const deckTwo = deckBuilder.shuffle(deckOne);
            expect(deckOne).to.not.deep.equal(deckTwo);
        });
    });
});