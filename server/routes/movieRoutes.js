const express = require("express");
const router = express.Router();
const {
  addMovie,
  getAllMovies,
  editMovie,
  deleteMovie,
  toggleWatched
} = require("../controllers/movieController");

const { auth, isAdmin } = require("../middleware/authMiddleware");

// PUBLIC or AUTHENTICATED
router.get("/", auth, getAllMovies);

// ADMIN ONLY
router.post("/", auth, isAdmin, addMovie);
router.put("/:id", auth, isAdmin, editMovie);
router.delete("/:id", auth, isAdmin, deleteMovie);

// USER (toggle watched)
router.patch("/toggle/:id", auth, toggleWatched);

module.exports = router;
