// export const addAces = (hand, addSuit) => {
const addAces = (hand, addSuit) => {
	const newHand = Object.assign({}, hand);
	const newCards = [ ...newHand.cards ];

    for (let i = 0; i < newHand.cards.length; i++) {
        if (newHand.cards[i].value === 14) {
			let newCard = { value: 1, suit: 'none' };
            if (addSuit) {
                newCard.suit = newHand.cards[i].suit;
			}
			newCards.push(newCard);
        }
	}
	newHand.cards = newCards;
    return newHand;
};

// export const removeAces = hand => {
const removeAces = hand => {
    const newHand = Object.assign({}, hand);

    for (let i = 0; i < newHand.cards.length; i = i) {
        if (newHand.cards[i].value === 1) {
            newHand.cards.splice(i, 1);
        } else {
            i++;
        }
    }
    return newHand;
};

module.exports = {
    addAces,
    removeAces
}
