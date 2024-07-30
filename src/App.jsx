import { useState } from "react";
import "./App.css";
import Search from "./components/Search";
import WeatherData from "./components/WeatherData";
import MoreDetails from "./components/MoreDetails";

export default function App() {
  const [location, setLocation] = useState("");
  const [page, setPage] = useState("search");
  return (
    <main>
      {page === "search" && (
        <Search setLocation={setLocation} setPage={setPage} />
      )}
      {page === "weather-data" && (
        <WeatherData location={location} setPage={setPage} />
      )}
      {page === "more-details" && (
        <MoreDetails location={location} setPage={setPage} />
      )}
    </main>
  );
}
