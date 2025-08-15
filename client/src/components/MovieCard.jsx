import React, { useState } from "react";

export default function MovieCard({ movie, user, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updated, setUpdated] = useState({
    title: movie.title,
    genre: movie.genre,
    releaseYear: movie.releaseYear
  });

  const isWatched = movie.watchedBy.includes(user.id);

  return (
    <div className="col-md-4 mb-3">
      <div style={{ border: "1px solid gray", padding: "10px", borderRadius: "8px" }}>
        {isEditing ? (
          <>
            <input value={updated.title} onChange={(e) => setUpdated({ ...updated, title: e.target.value })} />
            <input value={updated.genre} onChange={(e) => setUpdated({ ...updated, genre: e.target.value })} />
            <input value={updated.releaseYear} onChange={(e) => setUpdated({ ...updated, releaseYear: e.target.value })} />
            <button onClick={() => { onEdit(movie._id, updated); setIsEditing(false); }}>Save</button>
          </>
        ) : (
          <>
            <h5>{movie.title}</h5>
            <p>Genre: {movie.genre}</p>
            <p>Year: {movie.releaseYear}</p>
            {user.role === "user" && (
              <button onClick={() => onToggle(movie._id)}>
                {isWatched ? "✅ Watched" : "👀 Not Watched"}
              </button>
            )}
            {user.role === "admin" && (
  <>
    <button className="btn btn-warning me-2" onClick={() => setIsEditing(true)}>Edit</button>
    <button className="btn btn-danger" onClick={() => onDelete(movie._id)}>Delete</button>
  </>
)}

          </>
        )}
      </div>
    </div>
  );
}
