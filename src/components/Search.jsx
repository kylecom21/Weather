import { useState } from "react";
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
          <label htmlFor="search-input">Location: </label>
          <input
            type="text"
            id="search-input"
            value={searchInput}
            placeholder="Enter Location"
            onChange={handleChange}
          />
        </div>
        <button className="button">Search</button>
      </form>
    </section>
  );
}
