import { useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import error404 from "./assets/404.png";
import clearIcon from "./assets/clear.png";
import cloudsIcon from "./assets/clouds.png";
import hazeIcon from "./assets/haze.png";
import mistIcon from "./assets/mist.png";
import rainIcon from "./assets/rain.png";
import snowIcon from "./assets/snow.png";
import "./App.css";
require("dotenv").config();

function App() {
    const [city, setCity] = useState("");
    const [error, setError] = useState(false);
    const [weatherData, setWeatherData] = useState(null);

    function getWeatherIconSrc(weather) {
        switch (weather) {
            case "Clear":
                return clearIcon;
            case "Rain":
                return rainIcon;
            case "Snow":
                return snowIcon;
            case "Clouds":
                return cloudsIcon;
            case "Haze":
                return hazeIcon;
            case "Mist":
                return mistIcon;
            default:
                return null;
        }
    }

    const searchLocation = async () => {
        setWeatherData(null);
        const APIKey = process.env.APIKey.toString();
        if (city === "") {
            return;
        }
        try {
            const response = await axios.get(
                `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
            );
            setError(false);
            setWeatherData(response.data);
        } catch (ex) {
            setError(true);
            console.log(ex.message);
            console.log(ex);
        }
    };

    const handleClose = () => {
        setWeatherData(null);
        setError(false);
        setCity("");
    };
    return (
        <div className="App">
            <div
                className="container"
                style={
                    error
                        ? { height: "350px" }
                        : weatherData
                        ? { height: "590px" }
                        : {}
                }>
                <SearchBar
                    city={city}
                    setCity={setCity}
                    searchLocation={searchLocation}
                />
                <div
                    className={`not-found ${error ? "fadeIn" : ""}`}
                    style={error ? { display: "block" } : { display: "none" }}>
                    <img src={error404} alt="Not found" />
                    <p>Oops! Invalid location.</p>
                </div>
                <div
                    className={`weather-box ${weatherData ? "fadeIn" : ""}`}
                    style={
                        error
                            ? { display: "none" }
                            : weatherData
                            ? { display: "" }
                            : {}
                    }>
                    <img
                        src={getWeatherIconSrc(weatherData?.weather[0].main)}
                        alt="weather icon"
                    />

                    <p className="temperature">
                        {parseInt(weatherData?.main.temp)}
                        <span>°C</span>
                    </p>
                    <p className="description">
                        {weatherData?.weather[0].description}
                    </p>
                </div>
                <div
                    className={`weather-details ${weatherData ? "fadeIn" : ""}`}
                    style={
                        error
                            ? { display: "none" }
                            : weatherData
                            ? { display: "" }
                            : {}
                    }>
                    <div className="humidity">
                        <i className="fa-solid fa-water"></i>
                        <div className="text">
                            <span>{weatherData?.main.humidity}%</span>
                            <p>Humidity</p>
                        </div>
                    </div>
                    <div className="wind">
                        <i className="fa-solid fa-wind"></i>
                        <div className="text">
                            <span>{parseInt(weatherData?.wind.speed)}Km/h</span>
                            <p>Wind Speed</p>
                        </div>
                    </div>
                </div>
                <div
                    className={`close-container ${
                        weatherData || error ? "fadeIn" : ""
                    }`}>
                    <button
                        className="fa-solid fa-xmark"
                        onClick={handleClose}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
