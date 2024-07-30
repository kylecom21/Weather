import { useEffect, useState } from "react";
import apiKeys from "../../api-keys";
import exampleData from "../../example-data.json";
import axios from "axios";

export default function WeatherData({ location, setPage }) {
  const [weather, setWeather] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `http://api.weatherapi.com/v1/forecast.json?q=${location}&days=3&key=${apiKeys.weatherapi.baber}`
      )
      .then((response) => {
        setWeather(response.data);
        console.log(response.data);
        setIsLoading(false);
      });
  }, [location]);

  return (
    <>
      <section className="button">
        <button onClick={() => setPage("search")}>Go Back</button>
      </section>
      {isLoading && <section className="loading">Loading...</section>}
      {!isLoading && (
        <>
          <section className="current-weather">
            <h2>
              {weather.location?.name}, {weather.location?.country}
            </h2>
            <img
              src={weather.current?.condition.icon}
              alt={weather.current?.condition.text}
            />
            <p className="current-temperature">
              {weather.current?.temp_c} &deg;C
            </p>
            <p>{weather.current?.condition.text}</p>
            <p>Feels like: {weather.current?.feelslike_c} &deg;C</p>
            <p>UV Index: {weather.current?.uv}</p>
            <p>Humidity: {weather.current?.humidity}</p>
            <p>Wind Speed: {weather.current?.wind_mph}</p>
          </section>
          <section className="forecast">
            <h3>Forecast</h3>
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
                </div>
              );
            })}
          </section>
        </>
      )}
    </>
  );
}
