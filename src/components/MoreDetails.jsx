import axios from "axios";
import { useEffect, useState } from "react";
import apiKeys from "../../api-keys";

export default function MoreDetails({ location, setPage }) {
  const [todaysWeather, setTodaysWeather] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://api.weatherapi.com/v1/forecast.json?q=${location}&days=3&key=${apiKeys.weatherapi.baber}`
      )
      .then((response) => {
        setTodaysWeather(response.data.forecast.forecastday[0].hour);
      });
  }, [location]);

  return (
    <section>
      <div className="button">
        <button onClick={() => setPage("weather-data")}>Go Back</button>
      </div>
      <h2>More Details</h2>
      {todaysWeather.map((today) => {
        return (
          <div key={today.time_epoch}>
            <h3> {today.time}</h3>
            <img src={today.condition?.icon} alt={today.condition?.text} />
            <p>{today.temp_c} &deg;C</p>
          </div>
        );
      })}
    </section>
  );
}
