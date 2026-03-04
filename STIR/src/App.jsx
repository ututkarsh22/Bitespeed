import { useState } from "react";
import "./App.css"

function App() {
  const [id, setId] = useState("");
  const [movie, setMovie] = useState(null);
  const [sentiment, setSentiment] = useState("");

  const searchMovie = async () => {
    const res = await fetch(
      `https://www.omdbapi.com/?i=${id}&plot=full&apikey=${import.meta.env.VITE_OMDB_API_KEY}`
    );

    const data = await res.json();
    setMovie(data);

    analyzeSentiment(data.Plot);
  };

  const analyzeSentiment = async (plot) => {
    const res = await fetch("https://bitespeed-hqpv.onrender.com/sentiment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: plot })
    });

    const data = await res.json();
    setSentiment(data.result);
  };

  return (
    <div className="container">
  <h1>🎬 Movie Insight Tool</h1>

  <div className="search-box">
    <input
      placeholder="Enter IMDb ID (tt0133093)"
      onChange={(e) => setId(e.target.value)}
    />

    <button onClick={searchMovie}>Search</button>
  </div>

  {movie && (
    <div className="movie-card">
      <img src={movie.Poster} alt={movie.Title} />

      <div className="movie-info">
        <h2>{movie.Title}</h2>

        <p><b>Year:</b> {movie.Year}</p>
        <p><b>Rating:</b> {movie.imdbRating}</p>
        <p><b>Cast:</b> {movie.Actors}</p>
        <p className="plot">{movie.Plot}</p>

        <div className="sentiment-box">
          <h3>AI Insight</h3>
          <p>{sentiment}</p>
        </div>
      </div>
    </div>
  )}
</div>
  );
}

export default App;