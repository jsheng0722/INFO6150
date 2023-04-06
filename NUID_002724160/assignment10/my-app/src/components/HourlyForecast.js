import React, { useState, useEffect } from "react";
import Icon from './Icon';
import Day from './Day';
import { groupByDay, getHighestTemp, getMainWeather, getLowestTemp } from './Forecast';
import { useParams } from "react-router-dom";

function HourlyForecast() {
    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const [weatherData, setWeatherData] = useState(null);
    const { nameOfDay } = useParams();

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?zip=02115&appid=4c79fd413b3609ad5d1337f276d6aafc&units=imperial`);
            const data = await response.json();
            setWeatherData(data);
        } catch (error) {
            alert("Something error.");
            console.error("Something error.", error);
        }
        };
        fetchData();
    }, []);

    const getSelectedDayData = () => {
        if (!weatherData) {
        return [];
        }

        const selectedDayData = Object.entries(groupByDay(weatherData.list))
        .find(([dayOfWeek, data]) => weekDays[dayOfWeek] === nameOfDay);

        return selectedDayData ? selectedDayData[1] : [];
    };
    
    const selectedDayData = getSelectedDayData();

    return (
        <div className="container">
        {selectedDayData.length > 0 && (
            <div className="card-container">
            <div className="card">
                <div className="card-header">
                <h3>{nameOfDay}</h3>
                <p className="LowestTemp">LowestTemp: <span>{getLowestTemp(selectedDayData)}&deg;</span></p>
                <p className="HighestTemp">HighestTemp: <span>{getHighestTemp(selectedDayData)}&deg;</span></p>
                <p className="MainWeather">
                    <Icon name={getMainWeather(selectedDayData)}>
                    {getMainWeather(selectedDayData)}
                    </Icon>
                </p>
                </div>
                <div className="card-body">
                <table className="forecast-table">
                    <thead>
                    <tr>
                        <th>Max Temp</th>
                        <th>Min Temp</th>
                        <th>Weather</th>
                    </tr>
                    </thead>
                    <tbody>
                    {selectedDayData.map((day, index) => (
                        <Day
                        key={index}
                        day={{
                            temp_max: day.temp_max || 0,
                            temp_min: day.temp_min || 0,
                            weather: day.weather || "unknown",
                        }}
                        />
                    ))}
                    </tbody>
                </table>
                </div>
            </div>
            </div>
        )}
        </div>
    );
}

export default HourlyForecast;
