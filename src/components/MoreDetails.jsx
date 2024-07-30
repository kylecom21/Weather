import axios from "axios";
import { useEffect, useState } from "react";
import apiKeys from "../../api-keys";
import { Button } from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

export default function MoreDetails({ location, setPage }) {
  const [todaysWeather, setTodaysWeather] = useState([]);
  const [currentLocation, setCurrentLocation] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  function setLocation(response) {
    const country = response.data.location.country;
    const region = response.data.location.region;
    const name = response.data.location.name;

    setCurrentLocation({ name, region, country });
  }

  function setDate(response) {
    const date = response.data.forecast.forecastday[0].date;
    const [year, month, day] = date.split("-");

    const lookupObject = {
      1: "January",
      2: "February",
      3: "March",
      4: "April",
      5: "May",
      6: "June",
      7: "July",
      8: "August",
      9: "September",
      10: "October",
      11: "November",
      12: "December",
    };

    setCurrentDate(`${Number(day)} ${lookupObject[Number(month)]} ${year}`);
  }

  function getTime(dateTime) {
    return dateTime.split(" ")[1];
  }

  useEffect(() => {
    axios
      .get(
        `http://api.weatherapi.com/v1/forecast.json?q=${location}&days=3&key=${apiKeys.weatherapi.baber}`
      )
      .then((response) => {
        setTodaysWeather(response.data.forecast.forecastday[0].hour);
        setLocation(response);
        setDate(response);
      });
  }, [location]);

  return (
    <section className="more-details">
      <div className="button">
        <Button
          onClick={() => setPage("weather-data")}
          startIcon={<ArrowCircleLeftIcon />}
        >
          Go Back
        </Button>
      </div>
      <div className="location">
        <h2>{`${currentLocation.name}, ${currentLocation.region}`}</h2>
        <h3>{currentLocation.country}</h3>
        <p className="date">{currentDate}</p>
      </div>
      <div>
        {todaysWeather.map((today) => (
          <div key={today.time_epoch} className="detail">
            <h3>{getTime(today.time)}</h3>
            <img src={today.condition?.icon} alt={today.condition?.text} />
            <p>{today.temp_c} &deg;C</p>
          </div>
        ))}
      </div>
    </section>
  );
}
