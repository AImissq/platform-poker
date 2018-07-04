// export const valueSort = hand => {
const valueSort = hand => {
    let resultingHand = Object.assign({}, hand);
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

    resultingHand = {
        ...resultingHand,
        cards,
        suit: null,
        sort: "valueSort"
    };
    return resultingHand;
};

// export const suitSort = hand => {
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
        suit = "diamonds";
    } else if (spades.length > 4) {
        suit = "spades";
    }

    const resultingHand = {
        ...sortedHand,
        cards: [...hearts, ...clubs, ...diamonds, ...spades],
        suit: suit,
        sort: "suitSort"
    };

    return resultingHand;
};

module.exports = {
    valueSort,
    suitSort
}
