import React from 'react';
import myImage from '../img/weather.png';

const Icon = ({ name, label }) => {
    let positionX,positionY;
    if (name === 'Rain'){
        label = 'rainy';
        positionX = 5;
        positionY = 2;
    } else if (name === 'Clear'){
        positionX = 55;
        positionY = 140;
    } else if (name === 'Clouds'){
        label = 'cloudy';
        positionX = 105;
        positionY = 48;
    } else if (name === 'Snow'){
        label = 'snowy';
        positionX = 105;
        positionY = 2;
    } else{
        label = 'unknown';
        positionX = 5;
        positionY = 48;
    }
    const iconStyles = {
        backgroundImage: `url(${myImage})`,
        backgroundPosition: `-${positionX}px -${positionY}px`,
        backgroundSize: '160px 235px',
        width: '50px',
        height: '46px',
    };

    return <img style={iconStyles} alt='' />;
};

export default Icon;