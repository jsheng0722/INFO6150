import React, { useState, useEffect } from "react";
import Day from "./Day";
import "./Forecast.css";
import Icon from "./Icon";

const Forecast = () => {
    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const [weatherData, setWeatherData] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?zip=02115&appid=4c79fd413b3609ad5d1337f276d6aafc&units=imperial`
                );

                const data = await response.json();
                setWeatherData(data);
                console.log(data);
            } catch (error) {
                alert("Something error.");
                console.error("Something error.", error);
            }
        };
        fetchData();
    }, []);

    const getCityName = (data) => {
        if (data && data.city && data.city.name) {
            return data.city.name;
        } else {
            return "unknown";
        }
    };

    const handleDayClick = (date) => {
        setSelectedDate(selectedDate === date ? null : date);
    };

    return (
        <div className="container">
            <h1>5-day weather forecast for <em>{getCityName(weatherData)}</em></h1>
            {weatherData && (
                <div className="card-container">
                    {Object.entries(groupByDay(weatherData.list)).map(([dayOfWeek, data], index) => (
                        data.length > 0 && (
                        <div className="card" key={index}>
                            <div className="card-header" onClick={() => handleDayClick(weekDays[dayOfWeek])}>
                                <h3>{weekDays[dayOfWeek]}</h3>
                                
                                <p className="LowestTemp">LowestTemp: <span>{getLowestTemp(data)}&deg;</span></p>
                                <p className="HighestTemp">HighestTemp: <span>{getHighestTemp(data)}&deg;</span></p>
                                <p className="MainWeather">
                                <Icon name={getMainWeather(data)}>
                                    {getMainWeather(data)}
                                </Icon></p>
                            </div>
                            {selectedDate === weekDays[dayOfWeek] && (
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
                                        {data.map((day, index) => (
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
                        )}
                        </div>)
                    ))}
                </div>
            )}
        </div>
    );
};

export const groupByDay = (data) => {
    const daysOfWeek = [...Array(7)].map(() => []);

    data.forEach((day) => {
        const date = new Date(day.dt_txt);
        const dayOfWeek = date.getDay();
        daysOfWeek[dayOfWeek].push({
            dt_txt: day.dt_txt,
            temp_max: day.main.temp_max || 0,
            temp_min: day.main.temp_min || 0,
            weather: day.weather?.[0]?.main || "unknown",
        });
    });

    return daysOfWeek;
};

export const getHighestTemp = (data) => {
    let highTemp = -Infinity;
    data.forEach((day) => {
      if (day.temp_max > highTemp) {
        highTemp = day.temp_max;
      }
    });
    return highTemp;
};

export const getLowestTemp = (data) => {
    let lowTemp = Infinity;
    data.forEach((day) => {
    if (day.temp_min < lowTemp) {
        lowTemp = day.temp_min;
    }
    });
    return lowTemp;
};

export const getMainWeather = (data) => {
    const weatherCount = data.reduce((count, day) => {
        const mainWeather = day.weather || 'unknwon';
        count[mainWeather] = (count[mainWeather] || 0) + 1;
        return count;
    }, {});
    if (Object.keys(weatherCount).length === 0) {
        return 'unknown';
    }
    const mainWeather = Object.keys(weatherCount).reduce((a, b) => weatherCount[a] > weatherCount[b] ? a : b);
  
    return mainWeather;
}

export default Forecast;