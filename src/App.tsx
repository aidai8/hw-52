import React, { useState } from "react";
import "./App.css";
import Card from "./components/Card/Card.tsx";
import CardDeck from "./lib/CardDeck.ts";

const App: React.FC = () => {
    const [cards, setCards] = useState<{ rank: string; suit: string }[]>([]);

    const dealCards = () => {
        const deck = new CardDeck();
        const dealtCards = deck.getCards(5);
        setCards(dealtCards.map(card => ({ rank: card.rank, suit: card.suit })));
    };

    return (
        <div>
            <button onClick={dealCards}>Раздать карты</button>
            {cards.length > 0 && (
                <div className="playingCards faceImages">
                    {cards.map((card, index) => (
                        <Card
                            key={index}
                            rank={card.rank}
                            suit={card.suit as "diams" | "hearts" | "clubs" | "spades"} // Преобразуем тип явно
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default App;
