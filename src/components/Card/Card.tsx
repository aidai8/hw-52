import React from "react";

const suitSymbols = {
    diams: "♦",
    hearts: "♥",
    clubs: "♣",
    spades: "♠",
};

type Suit = keyof typeof suitSymbols;

const Card: React.FC<{ rank: string; suit: Suit }> = ({ rank, suit }) => {
    return (
        <span className={`card rank-${rank.toLowerCase()} ${suit}`}>
      <span className="rank">{rank}</span>
      <span className="suit">{suitSymbols[suit]}</span>
    </span>
    );
};

export default Card;