import React from "react";
import Card from "./components/Card/Card.tsx";

const App: React.FC = () => {
    return (
        <div>
            <Card rank="K" suit="hearts" />
        </div>
    );
};

export default App;

