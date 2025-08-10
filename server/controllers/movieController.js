const Movie = require("../models/Movie");

const addMovie = async (req, res) => {
  const { title, genre, releaseYear } = req.body;
  try {
    const movie = new Movie({ title, genre, releaseYear });
    await movie.save();
    res.status(201).json({ msg: "Movie added", movie });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

const getAllMovies = async (req, res) => {
  try {
    const { genre, year, watched } = req.query;
    const userId = req.user.id;

    let filter = {};
    if (genre) filter.genre = genre;
    if (year) filter.releaseYear = Number(year);

    // filter by watched/unwatched
    if (watched === "watched") {
      filter.watchedBy = userId;
    } else if (watched === "unwatched") {
      filter.watchedBy = { $ne: userId };
    }

    const movies = await Movie.find(filter);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};


const editMovie = async (req, res) => {
  const { id } = req.params;
  const { title, genre, releaseYear } = req.body;

  try {
    const movie = await Movie.findByIdAndUpdate(id, { title, genre, releaseYear }, { new: true });
    if (!movie) return res.status(404).json({ msg: "Movie not found" });

    res.json({ msg: "Movie updated", movie });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).json({ msg: "Movie not found" });

    res.json({ msg: "Movie deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

const toggleWatched = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  try {
    const movie = await Movie.findById(id);
    if (!movie) return res.status(404).json({ msg: "Movie not found" });

    const alreadyWatched = movie.watchedBy.includes(userId);
    if (alreadyWatched) {
      movie.watchedBy.pull(userId);
    } else {
      movie.watchedBy.push(userId);
    }

    await movie.save();
    res.json({ msg: "Status toggled", movie });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  addMovie,
  getAllMovies,
  editMovie,
  deleteMovie,
  toggleWatched
};
