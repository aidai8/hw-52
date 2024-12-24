import Card from "./Card.ts";

class CardDeck {
    public deck: Card[];

    constructor() {
        const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
        const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
        this.deck= [];

        // Создаем все возможные карты
        for (const suit of suits) {
            for (const rank of ranks) {
                this.deck.push(new Card(rank, suit));
            }
        }
    }

    public getCard(): Card {
        if (this.deck.length === 0) {
            throw new Error('No cards left in the deck');
        }
        const randomIndex = Math.floor(Math.random() * this.deck.length);
        return this.deck.splice(randomIndex, 1)[0];
    }

    public getCards(howMany: number): Card[] {
        if (howMany > this.deck.length) {
            throw new Error('Not enough cards left in the deck');
        }
        const drawnCards: Card[] = [];
        for (let i = 0; i < howMany; i++) {
            drawnCards.push(this.getCard());
        }
        return drawnCards;
    }
}

export default CardDeck;