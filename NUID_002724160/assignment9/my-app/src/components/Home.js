import React from "react";
import Card from '../App/Cards/Card';

function Home(){
    const cards = [
        { title: "Welcome!", image: "/images/welcome.png", text: "This is the home page." }];
    return(
         <div>
            <h1 style={{ marginLeft: "10%" }}>Home Page</h1>
            {cards.map((card, index) => (
            <Card key={index} title={card.title} image={card.image} text={card.text} />
        ))}
        </div>
    )
}

export default Home