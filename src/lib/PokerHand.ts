import Card from "./Card.ts";

class PokerHand {
    private cards: Card[];

    constructor(cards: Card[]) {
        this.cards = cards;
    }

    public getOutcome(): string {
        if (this.isFlush()) return "Флэш";
        if (this.isThreeOfAKind()) return "Тройка";
        if (this.isTwoPairs()) return "Две пары";
        if (this.isOnePair()) return "Одна пара";
        return "Старшая карта";
    }

    private isFlush(): boolean {
        const suit = this.cards[0].suit;
        return this.cards.every(card => card.suit === suit);
    }

    private isThreeOfAKind(): boolean {
        const rankCounts = this.getRankCounts();
        return Object.values(rankCounts).some(count => count === 3);
    }

    private isTwoPairs(): boolean {
        const rankCounts = this.getRankCounts();
        return Object.values(rankCounts).filter(count => count === 2).length === 2;
    }

    private isOnePair(): boolean {
        const rankCounts = this.getRankCounts();
        return Object.values(rankCounts).some(count => count === 2);
    }

    private getRankCounts(): Record<string, number> {
        const counts: Record<string, number> = {};
        for (const card of this.cards) {
            counts[card.rank] = (counts[card.rank] || 0) + 1;
        }
        return counts;
    }
}

export default PokerHand;
