import { useState } from "react";
import "./App.css";
import Search from "./components/Search";
import WeatherData from "./components/WeatherData";

export default function App() {
  const [location, setLocation] = useState("");
  return (
    <div>
      <Search />
      <WeatherData />
    </div>
  );
}
