import React from "react";
import Card from '../App/Cards/Card';

function Contact(){
    const cards = [
        { title: "Contact Information", image: "images/contact.png", text: "The way to contact us." }];
    return(
        <div>
            <h1 style={{ marginLeft: "10%" }}>Contact Page</h1>
            {cards.map((card, index) => (
            <Card key={index} title={card.title} image={card.image} text={card.text} />
        ))}
        </div>
    )
}

export default Contact