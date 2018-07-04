const expect = require('chai').expect;
const aceManipulation = require('../../src/utils/aceManipulation');

describe('****************** FUNCTION aceManipulation ******************', () => {
    
    describe('addAces functionality', () => {
        const initialCards = {
            cards: [
                { value: 14, suit: 'hearts' },
                { value: 14, suit: 'spades' },
                { value: 12, suit: 'hearts' },
                { value: 13, suit: 'diamonds' },
                { value: 14, suit: 'diamonds' },
                { value: 2, suit: 'clubs' },
                { value: 14, suit: 'clubs' }
            ]
        };
        it('should not edit the value of the original hand', () => {
            const startingCards = Object.assign({}, initialCards);
            aceManipulation.addAces(startingCards, true);
            expect(startingCards).to.deep.equal(initialCards);
        });

        it('should add an extra card with a value of 1 if the matching 14 exists', () => {
            let newCards = Object.assign({}, initialCards);
            const expectedNew = {
                cards: [
                    { value: 14, suit: 'hearts' },
                    { value: 14, suit: 'spades' },
                    { value: 12, suit: 'hearts' },
                    { value: 13, suit: 'diamonds' },
                    { value: 14, suit: 'diamonds' },
                    { value: 2, suit: 'clubs' },
                    { value: 14, suit: 'clubs' },
                    { value: 1, suit: 'hearts' },
                    { value: 1, suit: 'spades' },
                    { value: 1, suit: 'diamonds' },
                    { value: 1, suit: 'clubs' }
                ]
            };
            newCards = aceManipulation.addAces(newCards, true);
            expect(newCards).to.deep.equal(expectedNew);
        });

        it('should exclude the suit if requested', () => {
            let newCards = Object.assign({}, initialCards);
            const expectedNew = {
                cards: [
                    { value: 14, suit: 'hearts' },
                    { value: 14, suit: 'spades' },
                    { value: 12, suit: 'hearts' },
                    { value: 13, suit: 'diamonds' },
                    { value: 14, suit: 'diamonds' },
                    { value: 2, suit: 'clubs' },
                    { value: 14, suit: 'clubs' },
                    { value: 1, suit: 'none' },
                    { value: 1, suit: 'none' },
                    { value: 1, suit: 'none' },
                    { value: 1, suit: 'none' }
                ]
            };
            newCards = aceManipulation.addAces(newCards);
            expect(newCards).to.deep.equal(expectedNew);
        });
    });

    describe('removeAces functionality', () => {
        const initialCards = {
            cards: [
                { value: 14, suit: 'hearts' },
                { value: 13, suit: 'spades' },
                { value: 1, suit: 'clubs' },
                { value: 12, suit: 'hearts' },
                { value: 11, suit: 'diamonds' },
                { value: 10, suit: 'diamonds' },
                { value: 9, suit: 'clubs' },
                { value: 8, suit: 'clubs' },
                { value: 1, suit: 'hearts' },
                { value: 7, suit: 'hearts' },
                { value: 6, suit: 'spades' },
                { value: 5, suit: 'diamonds' },
                { value: 4, suit: 'clubs' },
                { value: 1, suit: 'diamonds' },
                { value: 3, suit: 'clubs' },
                { value: 2, suit: 'hearts' },
                { value: 1, suit: 'spades' }
            ]
        };
        it('should not edit the value of the original hand', () => {
            const startingCards = Object.assign({}, initialCards);
            aceManipulation.removeAces(startingCards, true);
            expect(startingCards).to.deep.equal(initialCards);
        });

        it('should remove all cards with a value of 1 from the array', () => {
            let newCards = Object.assign({}, initialCards);
            const expectedNew = {
                cards: [
                    { value: 14, suit: 'hearts' },
                    { value: 13, suit: 'spades' },
                    { value: 12, suit: 'hearts' },
                    { value: 11, suit: 'diamonds' },
                    { value: 10, suit: 'diamonds' },
                    { value: 9, suit: 'clubs' },
                    { value: 8, suit: 'clubs' },
                    { value: 7, suit: 'hearts' },
                    { value: 6, suit: 'spades' },
                    { value: 5, suit: 'diamonds' },
                    { value: 4, suit: 'clubs' },
                    { value: 3, suit: 'clubs' },
                    { value: 2, suit: 'hearts' }
                ]
            };
            newCards = aceManipulation.removeAces(newCards, true);
            expect(newCards).to.deep.equal(expectedNew);
        });
    });
});
