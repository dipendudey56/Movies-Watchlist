import React, { useEffect, useState, useCallback } from "react";
import API from "../api";
import MovieCard from "../components/MovieCard";
import FilterBar from "../components/FilterBar";
import Navbar from "../components/Navbar";

export default function Dashboard({ user, setUser }) {
  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState({ genre: "", year: "" });
  const [newMovie, setNewMovie] = useState({ title: "", genre: "", releaseYear: "" });

const fetchMovies = useCallback(async () => {
  try {
    const res = await API.get("/movies", {
      params: {
        genre: filter.genre,
        year: filter.year,
        watched: filter.watched
      },
    });
    setMovies(res.data);
  } catch (err) {
    alert("Error fetching movies");
  }
}, [filter]);


  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
  };

  const handleToggle = async (id) => {
    try {
      await API.patch(`/movies/toggle/${id}`);
      fetchMovies();
    } catch (err) {
      alert("Error toggling status");
    }
  };

  const handleAdd = async () => {
    try {
      await API.post("/movies", newMovie);
      setNewMovie({ title: "", genre: "", releaseYear: "" });
      fetchMovies();
      alert("✅ Movie added successfully!");
    } catch (err) {
      alert("Error adding movie");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/movies/${id}`);
      fetchMovies();
      alert("🗑️ Movie deleted successfully!");
    } catch (err) {
      alert("Error deleting");
    }
  };

  const handleEdit = async (id, updated) => {
    try {
      await API.put(`/movies/${id}`, updated);
      fetchMovies();
      alert("✏️ Movie updated successfully!");
    } catch (err) {
      alert("Error updating");
    }
  };

  return (
    <div className="container mt-3">
      <Navbar user={user} handleLogout={handleLogout} />
      <h2 className="mb-3">🎬 Movie Watchlist</h2>

      <FilterBar setFilter={setFilter} />

      {user.role === "admin" && (
        <div className="mb-4">
          <h4>Add New Movie</h4>
          <input
            className="form-control mb-2"
            placeholder="Title"
            value={newMovie.title}
            onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
          />
          <input
            className="form-control mb-2"
            placeholder="Genre"
            value={newMovie.genre}
            onChange={(e) => setNewMovie({ ...newMovie, genre: e.target.value })}
          />
          <input
            className="form-control mb-2"
            type="number"
            placeholder="Release Year"
            value={newMovie.releaseYear}
            onChange={(e) => setNewMovie({ ...newMovie, releaseYear: e.target.value })}
          />
          <button className="btn btn-primary" onClick={handleAdd}>Add Movie</button>
        </div>
      )}

      <div className="row">
        {movies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            user={user}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
}
