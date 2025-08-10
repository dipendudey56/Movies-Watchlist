const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Movie = require("./models/Movie");

dotenv.config();

const movies = [
  { title: "The Shawshank Redemption", genre: "Drama", releaseYear: 1994 },
  { title: "The Godfather", genre: "Crime", releaseYear: 1972 },
  { title: "The Dark Knight", genre: "Action", releaseYear: 2008 },
  { title: "Pulp Fiction", genre: "Crime", releaseYear: 1994 },
  { title: "Inception", genre: "Sci-Fi", releaseYear: 2010 },
  { title: "Forrest Gump", genre: "Drama", releaseYear: 1994 },
  { title: "Fight Club", genre: "Drama", releaseYear: 1999 },
  { title: "Interstellar", genre: "Sci-Fi", releaseYear: 2014 },
  { title: "The Matrix", genre: "Sci-Fi", releaseYear: 1999 },
  { title: "Parasite", genre: "Thriller", releaseYear: 2019 },
  { title: "Gladiator", genre: "Action", releaseYear: 2000 },
  { title: "Avengers: Endgame", genre: "Superhero", releaseYear: 2019 },
  { title: "The Lion King", genre: "Animation", releaseYear: 1994 },
  { title: "The Silence of the Lambs", genre: "Thriller", releaseYear: 1991 },
  { title: "Schindler's List", genre: "History", releaseYear: 1993 },
  { title: "Titanic", genre: "Romance", releaseYear: 1997 },
  { title: "The Prestige", genre: "Mystery", releaseYear: 2006 },
  { title: "Coco", genre: "Animation", releaseYear: 2017 },
  { title: "La La Land", genre: "Musical", releaseYear: 2016 },
  { title: "The Social Network", genre: "Biography", releaseYear: 2010 },
  { title: "Joker", genre: "Drama", releaseYear: 2019 },
  { title: "The Departed", genre: "Crime", releaseYear: 2006 }
];

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    await Movie.deleteMany({});
    await Movie.insertMany(movies);

    console.log("✅ Mock movies added successfully.");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    process.exit(1);
  }
}

seedDB();
