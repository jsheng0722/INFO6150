import React from "react";
import Card from '../App/Cards/Card';

function AboutUs(){
    const cards = [
        { title: "Who We Are", image: "/images/who.png", text: "Talk about us." },
        { title: "Our Mission", image: "/images/mission.png", text: "What's our mission." }
        ];
    return(
        <div>
            <h1 style={{ marginLeft: "10%" }}>About Us Page</h1>
            {cards.map((card, index) => (
            <Card key={index} title={card.title} image={card.image} text={card.text} />
        ))}
        </div>
    )
}

export default AboutUs