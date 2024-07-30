import { useState } from "react";
import { Button, Input } from "@mui/material";

export default function Search({ setLocation, setPage }) {
  const [searchInput, setSearchInput] = useState("");
  function handleSubmit(event) {
    event.preventDefault();
    setLocation(searchInput);
    setSearchInput("");
    setPage("weather-data");
  }
  function handleChange(event) {
    setSearchInput(event.target.value);
  }
  return (
    <section className="search">
      <h1 className="title">Weather</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="search-input">Location </label>
          <Input
            type="text"
            id="search-input"
            value={searchInput}
            placeholder="Enter Location"
            onChange={handleChange}
          />
        </div>
        <Button variant="contained" onClick={handleSubmit}>Search</Button>
      </form>
    </section>
  );
}
