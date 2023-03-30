import React from "react";
import Card from '../App/Cards/Card';

function Jobs(){
    const cards = [{ title: "Job Listings", image: "/images/job.png", text: "There are jobs here." }];
    return(
        <div>
            <h1 style={{ marginLeft: "10%" }}>Jobs Page</h1>
            {cards.map((card, index) => (
            <Card key={index} title={card.title} image={card.image} text={card.text} />
        ))}
        </div>
    )
}

export default Jobs