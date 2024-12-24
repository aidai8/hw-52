import React, { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card/Card.tsx";
import CardDeck from "./lib/CardDeck.ts";
import PokerHand from "./lib/PokerHand.ts";

const App: React.FC = () => {
    const [cards, setCards] = useState<{ rank: string; suit: string }[]>(() => {
        const savedCards = localStorage.getItem("cards");
        return savedCards ? JSON.parse(savedCards) : [];
    });
    const [outcome, setOutcome] = useState<string>(() => {
        return localStorage.getItem("outcome") || "";
    });
    const [deck, setDeck] = useState<CardDeck | null>(null);
    const [remainingCards, setRemainingCards] = useState<number>(52);

    useEffect(() => {
        localStorage.setItem("cards", JSON.stringify(cards));
    }, [cards]);

    useEffect(() => {
        localStorage.setItem("outcome", outcome);
    }, [outcome]);

    useEffect(() => {
        if (deck) {
            setRemainingCards(deck.deck.length);
        }
    }, [deck, cards]);

    const resetDeck = () => {
        const newDeck = new CardDeck();
        setDeck(newDeck);
        setRemainingCards(52);
        setCards([]);
        setOutcome("");
    };

    const dealCards = () => {
        let currentDeck = deck;
        if (!currentDeck) {
            currentDeck = new CardDeck();
            setDeck(currentDeck);
        }

        if (currentDeck.deck.length < 5) {
            alert("Недостаточно карт в колоде! Колода будет сброшена.");
            resetDeck();
            return;
        }

        const dealtCards = currentDeck.getCards(5);
        setCards(dealtCards.map(card => ({ rank: card.rank, suit: card.suit })));

        const pokerHand = new PokerHand(dealtCards);
        setOutcome(pokerHand.getOutcome());
    };

    return (
        <div>
            <p>Карт в колоде осталось: {remainingCards}</p>
            {cards.length > 0 && (
                <div>
                    <div className="playingCards faceImages">
                        {cards.map((card, index) => (
                            <Card
                                key={index}
                                rank={card.rank}
                                suit={card.suit as "diams" | "hearts" | "clubs" | "spades"}
                            />
                        ))}
                    </div>
                    <p>Комбинация: {outcome}</p>
                </div>
            )}
            <button onClick={dealCards}>Раздать карты</button>
        </div>
    );
};

export default App;
