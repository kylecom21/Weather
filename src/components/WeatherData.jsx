import { useEffect, useState } from "react";
import apiKeys from "../../api-keys";
import axios from "axios";

import { Button } from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

export default function WeatherData({ location, setPage }) {
  const [weather, setWeather] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("");

  function setLocation(response) {
    const country = response.data.location.country;
    const region = response.data.location.region;
    const name = response.data.location.name;

    setCurrentLocation({ name, region, country });
  }

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `http://api.weatherapi.com/v1/forecast.json?q=${location}&days=3&key=${apiKeys.weatherapi.baber}`
      )
      .then((response) => {
        setWeather(response.data);
        setLocation(response);
        setIsLoading(false);
      });
  }, [location]);

  return (
    <section className="weather-data">
      <div className="button">
        <Button
          onClick={() => setPage("search")}
          startIcon={<ArrowCircleLeftIcon />}
        >
          Go Back
        </Button>
      </div>
      {isLoading && <div className="loading">Loading...</div>}
      {!isLoading && (
        <>
          <div className="current-weather">
            <div className="location">
              <h2>{`${currentLocation.name}, ${currentLocation.region}`}</h2>
              <h3>{currentLocation.country}</h3>
            </div>
            <div className="bigger">
              <img
                src={weather.current?.condition.icon}
                alt={weather.current?.condition.text}
              />
              <p className="temperature">{weather.current?.temp_c} &deg;C</p>
            </div>
            <p>{weather.current?.condition.text}</p>
            <p>Feels like {weather.current?.feelslike_c} &deg;C</p>
            <p>UV Index: {weather.current?.uv}</p>
            <p>{weather.current?.humidity}% humidity</p>
            <p>Wind Speed: {weather.current?.wind_mph} mph</p>
            <Button
              variant="outlined"
              onClick={() => {
                setPage("more-details");
              }}
            >
              More Details
            </Button>
          </div>
          <div className="forecast">
            <h3>Forecast</h3>
            <div>
              {weather.forecast?.forecastday.map((current, index) => {
                return (
                  <div key={index}>
                    <img
                      src={current.day.condition.icon}
                      alt={current.day.condition.text}
                    />
                    <p>
                      <span>{current.day.mintemp_c} &deg;C</span> /
                      <span> {current.day.maxtemp_c} &deg;C</span>
                    </p>
                    <p>
                      {index === 0
                        ? "Today"
                        : index === 1
                        ? "Tomorrow"
                        : "Day After"}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
