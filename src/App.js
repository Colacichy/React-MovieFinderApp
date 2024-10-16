import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";
import './App.css'
import moonIcon from './moon-svgrepo-com.svg'
import sunIcon from './sun-svgrepo-com.svg'

const API_URL = "http://www.omdbapi.com?apikey=YOUR_API_KEY";

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [theme]);

  const [movies, setMovies] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  return (
    <div className="app">
      <h1>MovieFinder</h1>
      <img 
        style={{ cursor: 'pointer', width: '50px', height: '50px' }}
        onClick={toggleTheme} 
        src={theme === 'light' ? sunIcon : moonIcon} 
        alt={theme === 'light' ? "light" : "dark"} 
      />
      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchTerm)} />
      </div>
      {
        movies?.length > 0
          ? (
            <div className="container">
              {movies.map((movie) => (
                <MovieCard movie = {movie} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <h2>No movies found</h2>
            </div>
          )
      }
    </div>
  );
}

export default App;
