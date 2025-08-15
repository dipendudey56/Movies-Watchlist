import React, { useState } from "react";

export default function FilterBar({ setFilter }) {
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [watched, setWatched] = useState("");

  const applyFilters = () => setFilter({ genre, year, watched });

  return (
    <div className="mb-4 d-flex flex-wrap gap-2">
      <input
        className="form-control"
        placeholder="Genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />
      <input
        className="form-control"
        type="number"
        placeholder="Release Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <select
        className="form-select"
        value={watched}
        onChange={(e) => setWatched(e.target.value)}
      >
        <option value="">All</option>
        <option value="watched">Watched</option>
        <option value="unwatched">Unwatched</option>
      </select>
      <button className="btn btn-outline-primary" onClick={applyFilters}>
        Apply Filters
      </button>
    </div>
  );
}
